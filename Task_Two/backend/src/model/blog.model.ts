import mongoose, { Schema, Document } from "mongoose";

export interface IComment {
    id: string; //id of user
    name: string;
    profilePic: string;
    comment: string;
    blogId: string;
    created_at: Date
}

interface IThumbnail {
    path: string;
    imageBase64: string
}

interface ILikedBy {
    id: string
}
export interface IBlog extends Document {
    id: string; // id of user
    title: string;
    thumbnail: IThumbnail;
    category: string;
    body: string;
    likes: number;
    likedBy: ILikedBy[];
    comments: IComment[];
}

const thumbnailSchema = new Schema<IThumbnail>({
    path: { type: String, required: true },
    imageBase64: { type: String, required: true },
})

const commentSchema = new Schema<IComment>({
    id: { type: String, required: true },
    name: { type: String, required: true },
    profilePic: { type: String, required: true },
    comment: { type: String, required: true },
    created_at: { type: Date, default: Date.now() }
});

let blogSchema = new Schema<IBlog>({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: [true, "Blog title is required"],
    },
    thumbnail: {
        type: thumbnailSchema,
        required: [true, "Blog thumbnail is required"],
    },
    category: {
        type: String,
        required: [true, "Blog category is required"],
    },
    body: {
        type: String,
        required: [true, "Blog body is required"],
    },
    likes: { type: Number, default: 0 },
    likedBy: {
        type: [{ id: { type: String, required: true } }],
        default: []
    },
    comments: [commentSchema]
}, { timestamps: true });

let Blog = mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
