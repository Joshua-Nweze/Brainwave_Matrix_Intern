export interface IComment {
    _id: string;
    id: string; //id of user
    name: string;
    profilePic: string;
    comment: string;
    blogId: string;
    created_at: Date
}

interface ILikedBy {
    _id: string;
    id: string
}

interface IThumbnail {
    path: string;
    imageBase64: string;
}

export interface IBlog {
    _id: string
    id: string; // id of user
    title: string;
    thumbnail: IThumbnail;
    category: string;
    body: string;
    likes: number;
    likedBy: ILikedBy[];
    comments: IComment[];
}