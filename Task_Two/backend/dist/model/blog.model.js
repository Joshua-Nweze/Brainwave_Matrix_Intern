import mongoose, { Schema } from "mongoose";
const thumbnailSchema = new Schema({
    path: { type: String, required: true },
    imageBase64: { type: String, required: true },
});
const commentSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    profilePic: { type: String, required: true },
    comment: { type: String, required: true },
    created_at: { type: Date, default: Date.now() }
});
let blogSchema = new Schema({
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
let Blog = mongoose.model("Blog", blogSchema);
export default Blog;
//# sourceMappingURL=blog.model.js.map