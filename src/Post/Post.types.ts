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
    getSplicedPosts: (req: Request<object, {posts?: Post[]}|string, object, {take?: string, skip?:string, filter?: boolean}>, res: Response<Post[]|string>)=> void;
    getPostById: (req: Request<{id:number}, {post?: Post}, object>, res: Response<{post?: Post}|string>)=> void;
    addPostToJson: (req: Request<object, {post?: CreatePost}|string, CreatePost>, res: Response<{post?: CreatePost}|string>)=> void;
    updateDataPost: (req: Request<{id:number}, {data?: UpdatePost}|string, UpdatePost>, res: Response<{data?: UpdatePost}|string>)=> void;
    deletePost: (req: Request<{id:number}, {data?: Post}|string, Post>, res: Response<{data?: Post}|string>)=> void;
}

export interface ServiceContract {
    getSplicedPosts: (skip: number, take: number, filter: boolean) =>Post[],
    getPostById: (postId: number) =>Post,
    addPostToJson: (requestBody: CreatePost) =>CreatePost,
    updateDataPost: (postId:number, postData: UpdatePost) =>UpdatePost[],
    deletePost: (postId:number) =>Post,
}

export interface RepositoryContract {
    // addToJson: (Array: CreatePost[], newObj: CreatePost) => Promise<{}>,
    getSplicedPosts: (skip: number, take: number, filter: boolean) => Promise<Post[]>,
    getPostById: (postId: number) => Promise<Post>,
    addPostToJson: (requestBody: CreatePost) => Promise<CreatePost>,
    updateDataPost: (postId:number, postData: UpdatePost) => Promise<{post: UpdatePost[]}>,
    deletePost: (postId:number) => Promise<{post: Post}>,
}