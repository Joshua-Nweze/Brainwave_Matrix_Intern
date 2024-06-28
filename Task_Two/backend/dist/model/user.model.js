import mongoose, { Schema } from "mongoose";
let profilePicSchema = new Schema({
    path: { type: String, default: null },
    imageBase64: { type: String, default: null },
});
let userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    profilePic: profilePicSchema,
    password: {
        type: String,
        required: [true, 'Password is required']
    }
}, { timestamps: true });
let User = mongoose.model('User', userSchema);
export default User;
//# sourceMappingURL=user.model.js.map