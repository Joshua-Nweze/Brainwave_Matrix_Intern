import express from "express";
import authController from "../controllers/auth.controller.js";
let { createAccount, login, deleteAccount } = authController;
let router = express.Router();
router.post('/create', (req, res) => createAccount(req, res));
router.post('/login', (req, res) => login(req, res));
router.delete('/delete', (req, res) => deleteAccount(req, res));
export default router;
//# sourceMappingURL=auth.routes.js.map