import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import path from 'path'

const uploadAvatar = (req: NextApiRequest, res: NextApiResponse) => {
  const form = formidable({
    uploadDir: path.join(process.cwd(), "./public/"),
    filename: () => `avatar.jpg`, // set upload file name
  })

  // TODO image type guard
  form.parse(req, err => {
    if (err) {
      res.statusCode = 400
      res.send({
        success: false,
        msg: String(err),
      })
      return
    }
    res.send({
      success: true,
    })
  })
}

export default uploadAvatar

/**
 * for using `formidable`
 * need to disable builtin body parser
 */
export const config = {
  api: {
    bodyParser: false,
  },
}
