import express from 'express';
import blogController from '../controllers/blog.controller.js';
import multerFuncs from '../utils/multer.js';
let { uploadThumbnail } = multerFuncs;
let { createBlog, deleteBlog } = blogController;
let router = express.Router();
let blogThumbnailUploadr = uploadThumbnail.single('thumbnail');
router.post('/create', (req, res) => {
    blogThumbnailUploadr(req, res, function (err) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        createBlog(req, res);
    });
});
router.delete('/delete', (req, res) => deleteBlog(req, res));
export default router;
//# sourceMappingURL=blog.routes.js.map