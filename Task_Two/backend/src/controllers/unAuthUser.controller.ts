import { Request, Response } from "express";
import Blog from "../model/blog.model.js";

async function getBlogs(req: Request, res: Response) {
    try {
        let blogSet = parseInt(req.query.p as string) || 0;
        let blogsPerSet = 6;

        let blogCategory = req.query.category;

        let blogs;
        // handle pagination
        if (!blogCategory) {
            blogs = await Blog.find()
                .sort({ createdAt: -1 })
                .skip(blogSet * blogsPerSet)
                .limit(blogsPerSet);
        } else {
            blogs = await Blog.find({ category: blogCategory })
                .skip(blogSet * blogsPerSet)
                .limit(blogsPerSet);
        }

        if (blogs.length === 0) {
            res.status(200).json({
                msg: "You've caught up with all the blogs.",
                allRetrieved: true,
            });
        } else {
            res.status(200).json({ msg: blogs, allRetrieved: false });
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
        // get newest comments first 
        if (blog?.comments && blog.comments.length > 0) {
            blog.comments = blog.comments.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        }

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
