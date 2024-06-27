import express, { Request, Response } from 'express'
import blogController from '../controllers/blog.controller.js'
import multerFuncs from '../utils/multer.js'

let { uploadThumbnail } = multerFuncs

let { createBlog, deleteBlog, likeBlog, commentBlog, deleteComment, editBlog, getUserBlogs } = blogController
let router = express.Router()

let blogThumbnailUploadr = uploadThumbnail.single('thumbnail')

router.post('/create', (req: Request, res: Response) => {
    blogThumbnailUploadr(req, res, function (err) {
        if (err) {
            return res.status(400).json({ message: err.message })
        }
        
        createBlog(req, res)
    })
})

router.delete('/delete', (req: Request, res: Response) => deleteBlog(req, res))
router.patch('/like', (req: Request, res: Response) => likeBlog(req, res))
router.patch('/comment', (req: Request, res: Response) => commentBlog(req, res))
router.delete('/delete-comment', (req: Request, res: Response) => deleteComment(req, res))

router.patch('/edit', (req: Request, res: Response) => {
        blogThumbnailUploadr(req, res, function (err) {
            if (err) {
                return res.status(400).json({ message: err.message })
            }
            
            editBlog(req, res)
        })
})

router.get('/my-blogs', (req: Request, res: Response) => getUserBlogs(req, res))

export default router