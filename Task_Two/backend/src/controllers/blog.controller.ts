import Blog, { IBlog } from "../model/blog.model.js";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createBlog(req: Request, res: Response) : Promise<void> {
    try {
        if (req.body && typeof req.body === "object") {
            let blogData: Partial<IBlog> = req.body as Partial<IBlog>
            
            if (blogData) {
                blogData.thumbnail = req.file?.path
            }

            let newBlog = new Blog(blogData)

            let createNewBlog = await newBlog.save()

            if (!createNewBlog) {
                res.status(500).json({ msg: "Something went wrong, try again later." });
                return
            } else {
                res.status(201).json({ msg: "Blog posted." });
            }

        } else {
            res.status(400).json({ msg: "Invalid req.body type." });
        }
    } catch (error: any) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((err: any) => err.message);
            res.status(400).json({ msg: messages })
        } else {
            res.status(500).json({
                msg: "Something went wrong, try again later.",
            });
        }
    }
}

async function deleteBlog(req: Request, res:Response) {
    try {
        let { blogId, id } = req.body

        let blog = await Blog.findById(blogId)

        if (blog) {
            if (blog.id == id) {
                await Blog.findByIdAndDelete(blogId)

                fs.unlinkSync(blog.thumbnail)

                res.status(200).json({ msg: "Blog deleted" })
            } else {
                res.status(403).json({ msg: "You do not have access to perform this action." });    
            }
        } else {
            res.status(500).json({ msg: "Something went wrong, try again later." });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Something went wrong, try again later." });
    }
}

export default {
    createBlog,
    deleteBlog
}