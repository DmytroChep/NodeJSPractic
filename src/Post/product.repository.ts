import path from "path"
import {readFileSync} from "fs"
import {writeFile} from "fs/promises"
import { CreatePost, Post, RepositoryContract, UpdatePost } from "./Post.types"
import { client } from "../client/client"
import { Prisma } from "../generated/prisma"


// // postsFromJson : JSON.parse(readFileSync(jsonPathPosts, "utf8")),
// addToJson: async(Array: CreatePost[], newObj: CreatePost) => {
//     const array = Array
//     array.push(newObj)
//     return await writeFile(jsonPathPosts, JSON.stringify(array))
// },
export const jsonPathPosts = path.join(__dirname, "..", "..","posts.json")

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
    getPostById: async (postId) => { 
    try{ 
        const post =  client.post.findUnique({
            where: {id: postId}
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
    addPostToJson: async (requestBody) => {
        try{
            console.log(requestBody)
    
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

    updateDataPost: async (postId, postData) => {
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
    deletePost: async (postId) => {
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
}





