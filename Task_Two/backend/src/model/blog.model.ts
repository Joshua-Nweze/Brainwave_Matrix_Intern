import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
    id: string; // id of user
    title: string;
    thumbnail: string;
    category: string;
    body: string
}

let blogSchema = new Schema<IBlog>({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: [true, "Blog title is required"]
    },
    thumbnail: {
        type: String,
        required: [true, "Blog thumbnail is required"]
    },
    category: {
        type: String,
        required: [true, "Blog category is required"]
    },
    body: {
        type: String,
        required: [true, "Blog body is required"]
    }
})

let Blog = mongoose.model<IBlog>('Blog', blogSchema)

export default Blog