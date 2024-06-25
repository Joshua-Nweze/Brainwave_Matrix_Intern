import express, { Request, Response } from 'express'
import unAuthUserController from '../controllers/unAuthUser.controller.js'

let { getBlogs, getBlog } = unAuthUserController
let router = express.Router()

router.get('/get-blogs', (req: Request, res: Response) => getBlogs(req, res))
router.get('/get-blog', (req: Request, res: Response) => getBlog(req, res))

export default router