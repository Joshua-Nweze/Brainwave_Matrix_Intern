import mongoose, { Schema } from "mongoose";
let blogSchema = new Schema({
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
});
let Blog = mongoose.model('Blog', blogSchema);
export default Blog;
//# sourceMappingURL=blog.model.js.map