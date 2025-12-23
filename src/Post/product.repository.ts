import path from "path"
import {readFileSync} from "fs"
import {writeFile} from "fs/promises"
import { CreatePost, Post, RepositoryContract, UpdatePost } from "./Post.types"
import { client } from "../client/client"
import { Prisma } from "../generated/prisma"
import { verify } from "jsonwebtoken"
import { ENV } from "../config/env"
import { Email } from "../User/User.types"



export const  productRepository:RepositoryContract = {
    getSplicedPosts: async (skip, take, filter) => {
        try{
            // Створюємо мутабельні версії змінних які збеігають query параметри та перетворюємо їх у певні типи даних
    
            const posts = await client.post.findMany({take: take})
            
    
            console.log(skip)
            console.log(take)
            console.log(filter)
            let filteredPosts: Post[] = posts.slice(skip, take + skip)
            if (filter){
                filteredPosts = filteredPosts.filter((element: Post) => {
                    return element.title.includes("a")
                })
            }
            return filteredPosts
        }catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError){
                if (error.code === "P2024"){
                    return "error code P2024"
                }
            }
            throw error
        }
    },
    getPostById: async (postId, include) => { 
    try{ 

        const post =  client.post.findUnique({
            where: {id: postId},
            include: include
        })

        return post
    }catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError){
                if (error.code === "P2024"){
                    return "error code P2024"
                }
            }
            throw error
        }
    },
    addPostToJson: async (requestBody, token) => {
        try{
            console.log(requestBody)
            const WebToken = verify(token, ENV.SECRET_KEY) as Email
            const user = await client.user.findUnique({
                where: {email: WebToken.email}
            })

            if (!user){
                return "user is not found"
            }

            requestBody.createdById = user.id
    
            const post = client.post.create({
                data: requestBody
            })
    
            return post
        }catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError){
                if (error.code === "P2024"){
                    return "error code P2024"
                }
            }
            throw error
        }
    },

    updateDataPost: async (postId, postData, token) => {
        try{
            const post = await client.post.update({
                where: {
                    id: postId, 
                },
                data: postData
            })
    
            
            return post
        }catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError){
                if (error.code === "P2024"){
                    return "error code P2024"
                }
            }
            throw error
        }
        
    },
    deletePost: async (postId, token) => {
        try{
            const post = await client.post.delete(
                {
                    where: {id: postId}
                }
            )
            console.log(post)
            return post
        }catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError){
                if (error.code === "P2024"){
                    return "error code P2024"
                }
            }
            throw error
        }
    },
    createComment: async (postId, body, token) => {
        const WebToken = verify(token, ENV.SECRET_KEY) as Email
        const user = await client.user.findUnique({
            where: {email: WebToken.email}
        })

        if (!user){
            return "user is not found"
        }

        const commentData = { ...body, postId, userId: user.id };

        const comment = await client.comment.create({data: commentData})
        return comment
    },
    likePost: async (postId, token) => {
        const WebToken = verify(token, ENV.SECRET_KEY) as Email
        const user = await client.user.findUnique({
            where: {email: WebToken.email}
        })

        if (!user){
            return "user is not found"
        }
        await client.postLike.create({
        data: {
            postId: postId,
            userId: user.id
        }})
        await client.post.update({
            where: { id: postId },
            data: {
                likesCount: {
                    increment: 1
                }
            }})

        return "post was successfully liked"
    },
    unlikePost: async (postId, token) => {
        const WebToken = verify(token, ENV.SECRET_KEY) as Email
        const user = await client.user.findUnique({
            where: {email: WebToken.email}
        })

        if (!user){
            return "user is not found"
        }

        await client.postLike.delete({
            where: {
                postId_userId: {
                    postId: postId,
                    userId: user.id
                }
            }
        });
        await client.post.update({
            where: { id: postId },
            data: {
                likesCount: {
                    decrement: 1
                }
            }})

        return "post was successfully unliked"
        }
}
