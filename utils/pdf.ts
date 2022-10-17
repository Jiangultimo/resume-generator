import puppeteer from 'puppeteer'

import type { PDFOptions, Page, PuppeteerLaunchOptions } from 'puppeteer'

/**
 * args list [list of Chromium command line switched](https://peter.sh/experiments/chromium-command-line-switches/)
 */
const defaultPuppeteerLaunchOptions: PuppeteerLaunchOptions = {
  args: [
    '--disable-setuid-sandbox',
    '--no-sandbox',
    '--font-render-hinting=none'
  ]
}

const defaultPDFOptions: PDFOptions = {
  format: 'a4',
  displayHeaderFooter: false,
  printBackground: true,
}

export const generatePDF = async (
  url: string,
  options: PuppeteerLaunchOptions = defaultPuppeteerLaunchOptions,
  pdfOptions: PDFOptions = defaultPDFOptions
): Promise<Buffer> => {
  const browser = await puppeteer.launch(options)
  const page: Page = await browser.newPage()

  await page.setDefaultNavigationTimeout(0)
  await page.goto(url, {
    waitUntil: 'networkidle2'
  })
  // hide tool menu & resume background image
  await page.addStyleTag({
    content: `
    #tools{
      display: none;
    }
    #resume{
      background: none;
    }
    `
  })
  const pdfBuffer = await page.pdf(pdfOptions)
  await browser.close()
  return pdfBuffer
}
