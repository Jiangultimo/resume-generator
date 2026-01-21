import { cookies } from 'next/headers'
import { getContent } from '@/utils/parse'
import ResumeClient from '@/components/ResumeClient'

// 这是一个 Server Component
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  // 1. 优先使用 URL 参数
  // 2. 其次使用 cookie
  // 3. 默认使用英文
  const cookieStore = await cookies()
  const params = await searchParams
  const urlLang = params.lang
  const cookieLang = cookieStore.get('language')?.value

  let language = 'en'
  let langParam = 'en'

  if (urlLang === 'cn' || urlLang === 'zh') {
    language = 'zh'
    langParam = 'cn'
  } else if (urlLang === 'en') {
    language = 'en'
    langParam = 'en'
  } else if (cookieLang === 'zh' || cookieLang === 'cn') {
    language = 'zh'
    langParam = 'cn'
  } else if (cookieLang === 'en') {
    language = 'en'
    langParam = 'en'
  }

  // 在服务端获取简历数据
  const resumeData = await getContent(langParam)

  // 将数据传递给客户端组件
  return <ResumeClient initialData={resumeData} initialLanguage={language} />
}

// 可选：添加元数据以改善 SEO
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const params = await searchParams
  const isZh = params.lang === 'cn' || params.lang === 'zh'

  if (isZh) {
    return {
      title: '蒋正兴 - 全栈工程师 | AI专家 | 个人简历',
      description: '9年全栈开发经验，曾任AI创业公司技术负责人。擅长AI/LLM应用开发、React、Next.js、Node.js、Python。求职意向：全职/远程优先。',
      keywords: [
        '蒋正兴',
        '全栈工程师',
        'AI工程师',
        'LLM',
        'React开发',
        'Next.js',
        'Node.js',
        'Python',
        '远程工作',
        '技术负责人',
        'RAG',
        'LangChain',
        '重庆',
        '个人简历'
      ],
      openGraph: {
        title: '蒋正兴 - 全栈工程师 | AI专家',
        description: '9年全栈开发经验，擅长AI/LLM应用开发、React、Next.js、Node.js、Python',
        locale: 'zh_CN',
      },
      alternates: {
        canonical: 'https://hi.sparkify.me?lang=cn',
        languages: {
          'en': 'https://hi.sparkify.me?lang=en',
          'zh-CN': 'https://hi.sparkify.me?lang=cn',
        },
      },
    }
  }

  return {
    title: 'Zhengxing Jiang - Full-Stack Engineer | AI Expert | Resume',
    description: '9 years of full-stack development experience. Former Tech Lead at AI startup. Expert in AI/LLM applications, React, Next.js, Node.js, Python. Available for full-time/remote opportunities.',
    keywords: [
      'Zhengxing Jiang',
      'Full-Stack Developer',
      'AI Engineer',
      'LLM',
      'React Developer',
      'Next.js',
      'Node.js',
      'Python',
      'Remote Work',
      'Tech Lead',
      'RAG',
      'LangChain',
      'Chongqing',
      'Resume'
    ],
    openGraph: {
      title: 'Zhengxing Jiang - Full-Stack Engineer | AI Expert',
      description: '9 years of full-stack development experience. Expert in AI/LLM applications, React, Next.js, Node.js, Python.',
      locale: 'en_US',
    },
    alternates: {
      canonical: 'https://hi.sparkify.me?lang=en',
      languages: {
        'en': 'https://hi.sparkify.me?lang=en',
        'zh-CN': 'https://hi.sparkify.me?lang=cn',
      },
    },
  }
}
