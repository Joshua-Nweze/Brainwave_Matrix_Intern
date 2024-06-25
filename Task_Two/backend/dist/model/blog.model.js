import mongoose, { Schema } from "mongoose";
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
        type: String,
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
    comments: {
        type: [
            {
                id: { type: String, required: true },
                name: { type: String, required: true },
                profilePic: { type: String, required: true },
                comment: { type: String, required: true },
                created_at: { type: Date, default: Date.now() }
            },
        ],
        default: [],
    },
}, { timestamps: true });
let Blog = mongoose.model("Blog", blogSchema);
export default Blog;
//# sourceMappingURL=blog.model.js.map