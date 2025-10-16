import path from "path";
import { Request, Response } from "express";

export interface IPost {
    title: string,
    description: string,
    image: string;
    id: number;
}


export type CreatePostData = Omit<IPost, "id">

export type UpdatePostData = Partial<Omit<IPost, "id">>    


export interface ControllerContract {
    getSplicedPosts: (req: Request<object, {status: string; posts?: IPost[]}|string, object, {take?: string, skip?:string, filter?: boolean}>, res: Response<{status: string; posts?: IPost[]}|string>)=> void;
    getPostById: (req: Request<{id:number}, {status: string; post?: IPost}, object>, res: Response<{status: string; post?: IPost}|string>)=> void;
    addPostToJson: (req: Request<object, {status: string; post?: IPost}|string, IPost>, res: Response<{status: string; post?: IPost}|string>)=> void;
    updateDataPost: (req: Request<{id:number}, {status: string; data?: IPost}|string, IPost>, res: Response<{status: string; data?: IPost}|string>)=> void;
}

export interface ServiceContract {
    getSplicedPosts: (skip: number, take: number, filter: boolean) => {status: string, posts?: IPost[]},
    getPostById: (postId: number) => {status: string, post?: IPost},
    addPostToJson: (requestBody: IPost) => {status: string, post?: IPost},
    updateDataPost: (postId:number, postData: IPost) => Promise<{status: string, post?: IPost[]}>,
}