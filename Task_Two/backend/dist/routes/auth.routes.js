import express from "express";
import authController from "../controllers/auth.controller.js";
import multerFuncs from '../utils/multer.js';
let { uploadProfilePic } = multerFuncs;
let { createAccount, login, deleteAccount, getUser, editAccount, changePassword } = authController;
let router = express.Router();
let profilePicUploadr = uploadProfilePic.single('profilePic');
router.post('/create', (req, res) => createAccount(req, res));
router.post('/login', (req, res) => login(req, res));
router.delete('/delete', (req, res) => deleteAccount(req, res));
router.get('/get-user', (req, res) => getUser(req, res));
router.patch('/edit', (req, res) => {
    profilePicUploadr(req, res, function (err) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        editAccount(req, res);
    });
});
router.patch('/change-password', (req, res) => changePassword(req, res));
export default router;
//# sourceMappingURL=auth.routes.js.map