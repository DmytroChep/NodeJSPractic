import type { Request, Response } from "express";
import path from "path";
import type { Prisma } from "../generated/prisma";

// export interface IPost {
//     title: string,
//     description: string,
//     image: string;
//     id: number;
// }

export type Post = Prisma.PostGetPayload<{}>;
export type PostWithTags = Prisma.PostGetPayload<{ include: { tags: true } }>;

export type CreatePost = Prisma.PostUncheckedCreateInput;
export type CreatePostChecked = Prisma.PostCreateInput;

export type UpdatePost = Prisma.PostUncheckedUpdateInput;
export type UpdatePostChecked = Prisma.PostUpdateInput;

export type CreatePostData = Omit<Post, "id">;

export type UpdatePostData = Partial<Omit<Post, "id">>;

export type Comment = Prisma.CommentGetPayload<{}>;
export type createComment = Prisma.CommentUncheckedCreateInput;

export type PostWithRelations = Prisma.PostGetPayload<{
	include: {
		tags: true;
		comments: true;
		likedBy: true;
	};
}>;

export interface getPostByIdQueries {
	likedBy?: boolean;
	comments?: boolean;
}

export interface ControllerContract {
	getSplicedPosts: (
		req: Request<
			object,
			PostWithTags[] | string,
			object,
			{ take?: string; skip?: string; filter?: boolean }
		>,
		res: Response<PostWithTags[] | string>,
	) => Promise<void>;
	getPostById: (
		req: Request<{ id: number }, Post | string | null, { include?: string }>,
		res: Response<Post | string | null>,
	) => Promise<void>;
	addPostToJson: (
		req: Request<object, Post | string, Post>,
		res: Response<Post | string, { token: string }>,
	) => Promise<void>;
	updateDataPost: (
		req: Request<{ id: number }, UpdatePost | string, UpdatePost>,
		res: Response<UpdatePost | string, { token: string }>,
	) => Promise<void>;
	deletePost: (
		req: Request<{ id: number }, Post | string, Post>,
		res: Response<Post | string, { token: string }>,
	) => Promise<void>;
	createComment: (
		req: Request<{ id: number }, Comment | string, Comment>,
		res: Response<Comment | string, { token: string }>,
	) => Promise<void>;
	likePost: (
		req: Request<{ id: number }, string>,
		res: Response<string, { token: string }>,
	) => Promise<void>;
	unlikePost: (
		req: Request<{ id: number }, string>,
		res: Response<string, { token: string }>,
	) => Promise<void>;
	getPostWithRels: (
		req: Request<{ id: number }, PostWithRelations | string>,
		res: Response<PostWithRelations | string>,
	) => Promise<void>;
    isLikedPost: (
        req: Request<{id: number}, boolean | string>, 
        res: Response<boolean | string , {token: string}>) => Promise<void>
}

export interface ServiceContract {
	getSplicedPosts: (
		skip: number,
		take: number,
		filter: boolean,
	) => Promise<PostWithTags[] | string>;
	getPostById: (
		postId: number,
		include: string | string[],
	) => Promise<Post | string | null>;
	addPostToJson: (
		requestBody: CreatePost,
		token: string,
	) => Promise<Post | string>;
	updateDataPost: (
		postId: number,
		postData: UpdatePost,
		token: string,
	) => Promise<UpdatePost | string>;
	deletePost: (postId: number, token: string) => Promise<Post | string>;
	createComment: (
		postId: number,
		body: createComment,
		token: string,
	) => Promise<Comment | string>;
	likePost: (postId: number, token: string) => Promise<string>;
	unlikePost: (postId: number, token: string) => Promise<string>;
	getPostWithRels: (postId: number) => Promise<PostWithRelations | string>;
    isLikedPost: (postId: number, token: string) => Promise<boolean | string>
}

export interface RepositoryContract {
	getSplicedPosts: (
		skip: number,
		take: number,
		filter: boolean,
	) => Promise<PostWithTags[] | string>;
	getPostById: (
		postId: number,
		include: getPostByIdQueries,
	) => Promise<Post | string | null>;
	addPostToJson: (
		requestBody: CreatePost,
		token: string,
	) => Promise<Post | string>;
	updateDataPost: (
		postId: number,
		postData: UpdatePost,
		token: string,
	) => Promise<UpdatePost | string>;
	deletePost: (postId: number, token: string) => Promise<Post | string>;
	createComment: (
		postId: number,
		body: createComment,
		token: string,
	) => Promise<Comment | string>;
	likePost: (postId: number, token: string) => Promise<string>;
	unlikePost: (postId: number, token: string) => Promise<string>;
	getPostWithRels: (postId: number) => Promise<PostWithRelations | string>;
    isLikedPost: (postId: number, token: string) => Promise<boolean | string>
}
