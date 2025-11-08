import { Prisma } from "../generated/prisma";
import { Request, Response } from "express";


export type User = Prisma.UserGetPayload<{}>;

export type CreateUser = Prisma.UserUncheckedCreateInput;

export interface RepositoryContract {
    registration: (UserData: CreateUser) => Promise<CreateUser | string >,
    login: (UserData: CreateUser) => Promise<CreateUser | string | null >,
}

export interface ServiceContract {
    registration: (UserData: CreateUser) => Promise<CreateUser | string >,
    login: (UserData: CreateUser) => Promise<CreateUser | string >,
}

export interface ControllerContract {
    registration: (req: Request<object, CreateUser | string, CreateUser>, res: Response<CreateUser|string>) => Promise<void>,
    login: (req: Request<object, CreateUser | string, CreateUser>, res: Response<CreateUser|string>) => Promise<void>,
    
}
