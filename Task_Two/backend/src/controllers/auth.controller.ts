import User, { IUser } from "../model/user.model.js";
import { Request, Response } from "express";
import Blog, { IBlog } from "../model/blog.model.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs"

dotenv.config();

// create jwt
function createToken(id: any) {
    if (!process.env.JWT_SECRET) {
        throw new Error("DB_URI environment variable is not defined");
    }

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 2 * 24 * 60 * 60 /* 2 days in seconds */,
    });
}

async function createAccount(req: Request, res: Response): Promise<void> {
    // TODO: add func to send otp
    try {
        if (req.body && typeof req.body === "object") {
            let userData: Partial<IUser> = req.body as Partial<IUser>;

            let existingAccount = await User.findOne({ email: userData.email });

            if (existingAccount) {
                res.status(400).json({ msg: "Account with email exists." });
                return;
            }

            let hashedPwd;
            if (userData.password) {
                hashedPwd = await bcrypt.hash(userData.password, 10);

                userData.password = hashedPwd;
            }

            let newUser = new User(userData);

            let createUser = await newUser.save();

            if (createUser) {
                res.status(201).json({ msg: "Account created successfully." });
                return;
            } else {
                res.status(500).json({
                    msg: "Could not create account, try again later.",
                });
                return;
            }
        } else {
            res.status(400).json({ msg: "Invalid req.body type." });
        }
    } catch (error: any) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(
                (err: any) => err.message
            );
            res.status(400).json({ msg: messages });
        } else {
            res.status(500).json({
                msg: "Something went wrong, try again later.",
            });
        }
    }
}

async function login(req: Request, res: Response): Promise<void> {
    try {
        let { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ msg: "Invalid email or password." });
            return;
        }

        const isPwdTrue = await bcrypt.compare(password, user.password);

        if (isPwdTrue) {
            const token = createToken(email);

            res.status(200).json({ msg: "Login successful", token });
            return;
        } else {
            res.status(400).json({ msg: "Invalid email or password." });
            return;
        }
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong, try again later." });
    }
}

async function deleteAccount(req: Request, res: Response) {
    try {
        // TODO: write func to del user dp  
        let { id, password } = req.body;

        let user = await User.findById(id);

        if (!user) {
            res.status(400).json({ msg: "Account not found." });
            return;
        }

        const isPwdTrue = await bcrypt.compare(password, user.password);

        if (isPwdTrue) {
            let allUserBlogs = await Blog.find({ id });
            if (allUserBlogs) {
                if (allUserBlogs && allUserBlogs.length > 0) {
                    for (const blog of allUserBlogs) {
                        // delete all user blogs and blog thumbnails
                        if (blog.thumbnail && fs.existsSync(blog.thumbnail)) {
                            fs.unlinkSync(blog.thumbnail)
                        }
                        await Blog.findByIdAndDelete(blog._id)
                    }
                }
            }

            let delAccount = await User.findByIdAndDelete(id);

            if (delAccount) {
                res.status(200).json({ msg: "Account deleted successfully" });
                return;
            } else {
                res.status(500).json({
                    msg: "Something went wrong, try again later.",
                });
            }
        } else {
            res.status(400).json({ msg: "Invalid password." });
            return;
        }
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong, try again later." });
    }
}

export default {
    createAccount,
    login,
    deleteAccount
};
