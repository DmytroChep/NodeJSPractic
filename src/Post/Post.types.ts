import path from "path";
import { Request, Response } from "express";
import { Prisma } from "../generated/prisma";

// export interface IPost {
//     title: string,
//     description: string,
//     image: string;
//     id: number;
// }

export type Post = Prisma.PostGetPayload<{include: {tags: false}}>;
export type PostWithTags = Prisma.PostGetPayload<{include: {tags: true}}>;

export type CreatePost = Prisma.PostUncheckedCreateInput;
export type CreatePostChecked = Prisma.PostCreateInput;

export type UpdatePost = Prisma.PostUncheckedUpdateInput;
export type UpdatePostChecked = Prisma.PostUpdateInput;


export type CreatePostData = Omit<Post, "id">

export type UpdatePostData = Partial<Omit<Post, "id">>    


export interface ControllerContract {
    getSplicedPosts: (req: Request<object, {status: string; posts?: Post[]}|string, object, {take?: string, skip?:string, filter?: boolean}>, res: Response<{status: string; posts?: Post[]}|string>)=> void;
    getPostById: (req: Request<{id:number}, {status: string; post?: Post}, object>, res: Response<{status: string; post?: Post}|string>)=> void;
    addPostToJson: (req: Request<object, {status: string; post?: CreatePost}|string, CreatePost>, res: Response<{status: string; post?: CreatePost}|string>)=> void;
    updateDataPost: (req: Request<{id:number}, {status: string; data?: UpdatePost}|string, UpdatePost>, res: Response<{status: string; data?: UpdatePost}|string>)=> void;
    deletePost: (req: Request<{id:number}, {status: string; data?: Post}|string, Post>, res: Response<{status: string; data?: Post}|string>)=> void;
}

export interface ServiceContract {
    getSplicedPosts: (skip: number, take: number, filter: boolean) => {status: string, posts?: Post[]},
    getPostById: (postId: number) => {status: string, post?: Post},
    addPostToJson: (requestBody: CreatePost) => {status: string, post?: CreatePost},
    updateDataPost: (postId:number, postData: UpdatePost) => {status: string, post?: UpdatePost[]},
    deletePost: (postId:number) => {status: string, post?: Post},
}

export interface RepositoryContract {
    // addToJson: (Array: CreatePost[], newObj: CreatePost) => Promise<{}>,
    getSplicedPosts: (skip: number, take: number, filter: boolean) => Promise<{status: string, posts?: Post[]}>,
    getPostById: (postId: number) => Promise<{status: string, post?: Post}>,
    addPostToJson: (requestBody: CreatePost) => Promise<{status: string, post?: CreatePost}>,
    updateDataPost: (postId:number, postData: UpdatePost) => Promise<{status: string, post?: UpdatePost[]}>,
    deletePost: (postId:number) => Promise<{status: string, post?: Post}>,
}