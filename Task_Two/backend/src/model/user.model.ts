import mongoose, { Schema, Document }  from "mongoose";

interface IProfilePic {
    path: string;
    imageBase64: string
}

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePic: IProfilePic;
    createdAt: Date;
    updatedAt: Date;
}

let profilePicSchema = new Schema<IProfilePic>({
    path: { type: String, default: null },
    imageBase64: { type: String, default: null },
})

let userSchema = new Schema<IUser>({
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
}, { timestamps: true })

let User = mongoose.model<IUser>('User', userSchema)

export default User
