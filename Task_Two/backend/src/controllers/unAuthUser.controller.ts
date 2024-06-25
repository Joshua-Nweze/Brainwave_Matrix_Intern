import { Request, Response } from "express";
import Blog from "../model/blog.model.js";

async function getBlogs(req: Request, res: Response) {
    try {
        let blogSet = parseInt(req.query.p as string) || 0;
        let blogsPerSet = 3;

        let blogCategory = req.query.category;

        let blog;

        if (!blogCategory) {
            blog = await Blog.find()
                .skip(blogSet * blogsPerSet)
                .limit(blogsPerSet);
        } else {
            blog = await Blog.find({ category: blogCategory })
                .skip(blogSet * blogsPerSet)
                .limit(blogsPerSet);
        }

        if (blog.length == 0) {
            res.status(200).json({
                msg: "You've caught up with all the blogs",
            });
        } else {
            res.status(200).json({ msg: blog });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Something went wrong, try again later." });
    }
}

async function getBlog(req: Request, res: Response) {
    try {
        let id = req.query.id;

        let blog = await Blog.findById(id);

        if (blog) {
            res.status(200).json({ msg: blog });
        } else {
            res.status(200).json({ msg: "Blog not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Something went wrong, try again later." });
    }
}

export default {
    getBlogs,
    getBlog,
};
