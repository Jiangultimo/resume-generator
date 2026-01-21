import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'
import { getContent } from '@/utils/parse'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const lang = searchParams.get('lang') || 'cn'

  // 获取当前请求的 host
  const host = request.headers.get('host') || 'localhost:3000'
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const baseUrl = `${protocol}://${host}`

  // 获取简历数据以提取姓名和职位
  const resumeData = await getContent(lang === 'en' ? 'en' : 'cn')
  const intros = resumeData?.intros || []

  // 提取姓名
  const nameItem = intros.find(
    (item: Intro) => item.label?.toLowerCase() === 'name' || item.label === '姓名'
  )
  const name = nameItem?.value || (lang === 'en' ? 'Resume' : '简历')

  // 提取职位/求职意向
  const targetRoleItem = intros.find(
    (item: Intro) =>
      item.label?.toLowerCase() === 'target role' ||
      item.label === '求职意向'
  )
  const targetRole = targetRoleItem?.value || (lang === 'en' ? 'Full-Stack Developer' : '全栈开发')

  let browser = null

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    })

    const page = await browser.newPage()

    // 设置视口大小 - 使用较大宽度确保 PC 布局
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2,
    })

    // 访问页面，带上语言参数
    const pageUrl = `${baseUrl}?lang=${lang}`
    await page.goto(pageUrl, {
      waitUntil: 'networkidle0',
      timeout: 60000, // 增加超时时间到 60 秒
    })

    // 等待页面内容加载完成
    await page.waitForSelector('#resume', { timeout: 20000 }) // 增加等待时间到 20 秒

    // 等待所有动画完成（framer-motion 动画通常在 2-3 秒内完成）
    await new Promise(resolve => setTimeout(resolve, 3000))

    // 隐藏不需要打印的元素 + 移除背景图
    await page.evaluate(() => {
      // 隐藏带有 data-hide-on-print 属性的元素
      const hideElements = document.querySelectorAll('[data-hide-on-print]')
      hideElements.forEach(el => {
        ;(el as HTMLElement).style.display = 'none'
      })

      // 也隐藏 fixed 定位的控制按钮区域
      const fixedElements = document.querySelectorAll('.fixed')
      fixedElements.forEach(el => {
        ;(el as HTMLElement).style.display = 'none'
      })

      // 移除背景图，设置白色背景
      const resumeElement = document.getElementById('resume')
      if (resumeElement) {
        resumeElement.style.background = '#ffffff'
      }

      // 隐藏上传头像功能（UploadAvatar 组件）
      const uploadAvatarElements = document.querySelectorAll('[data-upload-avatar]')
      uploadAvatarElements.forEach(el => {
        ;(el as HTMLElement).style.display = 'none'
      })

      // 移除头像的 shadow 样式
      const avatarElements = document.querySelectorAll('[data-avatar]')
      avatarElements.forEach(el => {
        ;(el as HTMLElement).style.boxShadow = 'none'
      })

      // 移除 timeline node 的 shadow 样式
      const timelineNodes = document.querySelectorAll('[data-timeline-node]')
      timelineNodes.forEach(el => {
        ;(el as HTMLElement).style.boxShadow = 'none'
      })

      // 移除工作经验卡片的 shadow 样式
      const experienceCards = document.querySelectorAll('#experience .shadow-lg')
      experienceCards.forEach(el => {
        ;(el as HTMLElement).style.boxShadow = 'none'
      })

      // 移除技能和工作经历板块的 padding-y，使 PDF 更紧凑
      const skillsSection = document.getElementById('skills')
      if (skillsSection) {
        skillsSection.style.paddingTop = '0'
        skillsSection.style.paddingBottom = '0'
      }
      const experienceSection = document.getElementById('experience')
      if (experienceSection) {
        experienceSection.style.paddingTop = '0'
        experienceSection.style.paddingBottom = '0'
      }
      // 移除技能评价容器的 margin-bottom
      const skillsEvaluationsContainer = document.querySelector('[class*="skills-evaluations-container"]')
      if (skillsEvaluationsContainer) {
        ;(skillsEvaluationsContainer as HTMLElement).style.marginBottom = '0'
      }

      // 确保所有动画元素都是可见的（移除 opacity: 0 等动画初始状态）
      const allElements = document.querySelectorAll('*')
      allElements.forEach(el => {
        const style = window.getComputedStyle(el)
        if (style.opacity === '0') {
          ;(el as HTMLElement).style.opacity = '1'
        }
        // 移除 transform 动画效果
        if (style.transform !== 'none') {
          ;(el as HTMLElement).style.transform = 'none'
        }
      })
    })

    // 等待样式生效
    await new Promise(resolve => setTimeout(resolve, 500))

    // 生成 PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm',
      },
      preferCSSPageSize: false,
    })

    await browser.close()

    // 生成文件名：姓名 - 职位
    const filename = `${name} - ${targetRole}.pdf`
    // 对文件名进行 URL 编码以支持中文
    const encodedFilename = encodeURIComponent(filename)

    // 返回 PDF 文件
    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${encodedFilename}"; filename*=UTF-8''${encodedFilename}`,
      },
    })
  } catch (error) {
    console.error('PDF export error:', error)
    if (browser) {
      await browser.close()
    }
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}
