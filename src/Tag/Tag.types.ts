import path from "path";
import { Request, Response } from "express";
import { Prisma } from "../generated/prisma";

// export interface Itag {
//     title: string,
//     description: string,
//     image: string;
//     id: number;
// }

export type tag = Prisma.TagGetPayload<{}>;
export type tagWithTags = Prisma.TagGetPayload<{include: {posts: true}}>;

export type Createtag = Prisma.TagUncheckedCreateInput;
export type CreatetagChecked = Prisma.TagCreateInput;

export type Updatetag = Prisma.TagUncheckedUpdateInput;
export type UpdatetagChecked = Prisma.TagUpdateInput;


export type CreatetagData = Omit<tag, "id">

export type UpdatetagData = Partial<Omit<tag, "id">>    


export interface ControllerContract {
    getSplicedtags: (req: Request<object, tag[]|string, object, {take?: string, skip?:string, filter?: boolean}>, res: Response<tag[]|string>)=> Promise<void>;
    gettagById: (req: Request<{id:number}, tag, object>, res: Response<tag|null>)=> Promise<void>;
}

export interface ServiceContract {
    getSplicedtags: (skip: number, take: number, filter: boolean) => Promise<tag[]|string>,
    gettagById: (tagId: number) => Promise<tag|null>,
}

export interface RepositoryContract {
    // addToJson: (Array: Createtag[], newObj: Createtag) => Promise<{}>,
    getSplicedtags: (skip: number, take: number, filter: boolean) => Promise<tag[]|string>,
    gettagById: (tagId: number) => Promise<tag|null>,
}