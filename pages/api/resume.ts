// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getContent } from '@/utils/parse'

const requestHandler = async (req: NextApiRequest, res: NextApiResponse<Resume>) => {
  const resume =  await getContent('cn')
  res.statusCode = 200
  res.json(resume)
}

export default requestHandler
