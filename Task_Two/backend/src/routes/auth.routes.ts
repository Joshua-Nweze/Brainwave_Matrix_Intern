import express, { Request, Response } from "express";
import authController from "../controllers/auth.controller.js";import multerFuncs from '../utils/multer.js'

let { uploadProfilePic } = multerFuncs

let { createAccount, login, deleteAccount, getUser, editAccount, changePassword } = authController;
let router = express.Router()

let profilePicUploadr = uploadProfilePic.single('profilePic')

router.post('/create', (req: Request, res: Response) => createAccount(req, res));
router.post('/login', (req: Request, res: Response) => login(req, res));
router.delete('/delete', (req: Request, res: Response) => deleteAccount(req, res));
router.get('/get-user', (req: Request, res: Response) => getUser(req, res))

router.patch('/edit', (req: Request, res: Response) => {
    profilePicUploadr(req, res, function (err) {
        if (err) {
            return res.status(400).json({ message: err.message })
        }
        
        editAccount(req, res)
    })
})

router.patch('/change-password', (req: Request, res: Response) => changePassword(req, res))

export default router