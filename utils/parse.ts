import toml from '@ltd/j-toml'
import fs from 'fs/promises'
import path from 'path'

const root = path.resolve(process.cwd(), './')

const RESUME_SOURCE: {
  [key: string]: string
} = {
  cn: 'resume.toml',
  en: 'en-resume.toml'
}

export const getContent = async (type: string): Promise<Resume> => {
  const resumeBuffer = await fs.readFile(`${root}/config/${RESUME_SOURCE[type]}`)
  const resumeTable = toml.parse(resumeBuffer)
  return resumeTable.resume as unknown as Resume
}
