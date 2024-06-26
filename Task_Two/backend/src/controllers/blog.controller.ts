import Blog, { IBlog, IComment } from "../model/blog.model.js";
import { Request, Response } from "express";
import fs from "fs";
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

async function likeBlog(req: Request, res: Response) {
    try {
        let { blogId, userId } = req.body

        let blog = await Blog.findById(blogId)

        if (blog) {
            const alreadyLiked = blog.likedBy.some((likedBy) => likedBy.id === userId);

            if (alreadyLiked) {
                // remove like if user already likes blog
                const unlikeBlog = await Blog.findByIdAndUpdate(
                    blogId,
                    {
                        $inc: { likes: -1 },
                        $pull: { likedBy: { id: userId } }
                    },
                    { new: true }
                );

                if (unlikeBlog) {
                    res.status(200).json({ msg: "Like removed.", likes: unlikeBlog.likes })
                    return
                } else {
                    res.status(500).json({ msg: "Something went wrong, try again later." })
                    return
                }
            } else {
                // Increment the likes and add the user to likedBy array
                const likeBlog = await Blog.findByIdAndUpdate(
                    blogId,
                    {
                        $inc: { likes: 1 },
                        $push: { likedBy: { id: userId } }
                    },
                    { new: true }
                );

                if (likeBlog) {
                    res.status(200).json({ msg: "Liked.", likes: likeBlog.likes })
                    return
                } else {
                    res.status(500).json({ msg: "Something went wrong, try again later." })
                    return
                }
            }
        } else {
            res.status(404).json({ msg: "Blog not found." });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Something went wrong, try again later.",
        });
    }
}

async function commentBlog(req: Request, res: Response) {
    try {
        // let { id, name: profilePic, comment, blogId } = req.body
        let commentData: IComment = req.body as IComment 

        let blog = await Blog.findById(commentData.blogId)

        if (blog) {
            const comment = await Blog.findByIdAndUpdate(
                commentData.blogId,
                {
                    $push: { comments: { 
                        id: commentData.id,
                        name: commentData.name,
                        profilePic: commentData.profilePic,
                        comment: commentData.comment
                     } }
                },
                { new: true }
            );

            if (comment) {
                res.status(200).json({ msg: "Comment posted.", comments: comment.comments })
                return
            } else {
                res.status(500).json({ msg: "Something went wrong, try again later." })
                return
            }
        } else {
            res.status(404).json({ msg: "Blog not found." });
        }

    } catch (error) {
        res.status(500).json({
            msg: "Something went wrong, try again later.",
        });
    }
}

async function deleteComment(req: Request, res:Response) {
    try {
        let { blogId, commentId, userId } = req.body

        if(!blogId || !commentId || !userId) {
            res.status(400).json({ msg: "Missign re.body values." })
            return
        }

        let blog = await Blog.findById(blogId)

        if (!blog) {
            res.status(404).json({ msg: "Blog not found" })
            return
        }

        const updatedComments = await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull: { comments: { _id: commentId, id: userId } }
            },
            { new: true } // Return the updated document
        );
         
        if (updatedComments) {
            res.status(200).json({
                msg: "Comment deleted.",
                comments: updatedComments.comments
            })
        } else {
            res.status(500).json({
                msg: "Something went wrong, try again later.",
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Something went wrong, try again later.",
        });
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

async function editBlog(req: Request, res: Response) {
    try {
        if (req.body && typeof req.body === "object") {
            let blogData: Partial<IBlog> = req.body as Partial<IBlog>
            let { blogId } = req.body

            let blog = await Blog.findById(blogId)

            if (!blog) {
                res.status(404).json({ msg: "Blog not found." });
                return
            }
            // check if user is owner of blog
            if (blog.id != blogData.id) {
                res.status(403).json({ msg: "You do not have access to perform this action." });    
                return
            }
            // delete existing thumbnail if thumbnail is updated
            if (req.file) {
                fs.unlinkSync(blog.thumbnail)
                blogData.thumbnail = req.file?.path
            }

            let updateBlog = await Blog.findByIdAndUpdate(blogId, blogData, { new: true })

            if (updateBlog) {
                res.status(200).json({ msg: "Blog updated.", blog: updateBlog });
            } else {
                res.status(500).json({ msg: "Something went wrong, try again later." });
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Something went wrong, try again later." });
    }
}

export default {
    createBlog,
    deleteBlog,
    likeBlog,
    commentBlog,
    deleteComment,
    editBlog
}