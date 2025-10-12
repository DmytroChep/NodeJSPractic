import path from "path";

export interface IPost {
    title: string,
    description: string,
    image: string;
    id: number;
}


export type CreatePostData = Omit<IPost, "id">

export type UpdatePostData = Partial<Omit<IPost, "id">>    