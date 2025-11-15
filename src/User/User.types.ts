import { Prisma } from "../generated/prisma";
import { Request, Response } from "express";


export type User = Prisma.UserGetPayload<{}>;
export type UserWithoutPassword = Omit<Prisma.UserGetPayload<{}>, "password">;

export type CreateUser = Prisma.UserUncheckedCreateInput;

export interface RepositoryContract {
    registration: (UserData: CreateUser) => Promise<CreateUser | string >,
    login: (UserData: CreateUser) => Promise<CreateUser | string | null >,
    me: (UserEmail: string) => Promise<User|string>,
}

export interface ServiceContract {
    registration: (UserData: CreateUser) => Promise<string>,
    login: (UserData: CreateUser) => Promise<CreateUser | string>,
    me: (JWT: string) => Promise<UserWithoutPassword|string|null>,
}

export interface ControllerContract {
    registration: (req: Request<object, CreateUser | string, CreateUser>, res: Response<CreateUser|string>) => Promise<void>,
    login: (req: Request<object, CreateUser | string, CreateUser>, res: Response<CreateUser|string>) => Promise<void>,
    me: (req: Request<object, UserWithoutPassword, string>, res: Response<UserWithoutPassword|string>) => Promise<void>,
}
