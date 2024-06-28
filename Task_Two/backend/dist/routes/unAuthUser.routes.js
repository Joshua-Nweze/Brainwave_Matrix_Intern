import express from 'express';
import unAuthUserController from '../controllers/unAuthUser.controller.js';
let { getBlogs, getBlog } = unAuthUserController;
let router = express.Router();
router.get('/get-blogs', (req, res) => getBlogs(req, res));
router.get('/get-blog', (req, res) => getBlog(req, res));
export default router;
//# sourceMappingURL=unAuthUser.routes.js.map