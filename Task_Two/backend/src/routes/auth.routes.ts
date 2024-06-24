import express, { Request, Response } from "express";
import authController from "../controllers/auth.controller.js";

let { createAccount, login, deleteAccount } = authController;
let router = express.Router()

router.post('/create', (req: Request, res: Response) => createAccount(req, res));
router.post('/login', (req: Request, res: Response) => login(req, res));
router.delete('/delete', (req: Request, res: Response) => deleteAccount(req, res));

export default router