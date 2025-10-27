// const repositoriy = require("./product.repository")
import type {Request} from "express"
import { productRepository, jsonPathPosts } from "./product.repository"
import {CreatePost, ServiceContract} from "./Post.types"
import { writeFile } from "fs/promises"

export const postService:ServiceContract = {
    getSplicedPosts: async (skip, take, filter) => {
        // Отримуємо усі потрібні query параметри 
            
            
        const filteredPosts = await productRepository.getSplicedPosts(skip, take, filter)
        return filteredPosts
    },

    getPostById: async (postId) => {
        const post = await productRepository.getPostById(postId)

        return post
    },
    addPostToJson: async (requestBody) => {
        const post = await productRepository.addPostToJson(requestBody)
        return post
    },
    updateDataPost: async (postId, postData) => {
        try{
            if(!postId){
                return {status:"error"}
            }
            let post = await productRepository.postsFromJson.find((PostEL: CreatePost) => {
                return PostEL.id == postId
            });

            
            if (!post){
                return {status:"error"}
            }
            
            post = Object.assign(post, postData)
            console.log(post)
            await writeFile(jsonPathPosts, JSON.stringify(productRepository.postsFromJson))
            return post
        }catch{
            return {status: "error"}
        }
        
    } ,
    deletePost: async (postId) => {
        if (Number.isNaN(Number(postId))){
            return {status: "error"}
        }
        try{
            const post = await client.post.delete(
                {
                    where: {id: Number(postId)}
                }
            )
            console.log(post)
            return {status: "success", data:  post}
        }catch{
            return {status: "error"}
        }
    }
}

