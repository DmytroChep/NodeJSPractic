// const repositoriy = require("./product.repository")
import type {Request} from "express"
import { productRepository, jsonPathPosts } from "./product.repository"
import {CreatePost, ServiceContract} from "./Post.types"
import { writeFile } from "fs/promises"
import { client } from "../client/client"

export const postService:ServiceContract = {
    getSplicedPosts: async (skip, take, filter) => {
        // Отримуємо усі потрібні query параметри 

        // Ці умови потрібні щоб якщо query параметри не задані, задати стандартні дані

        let numberSkip = Number(skip)
        let numberTake = Number(take)
        let boolFilter = Boolean(filter)
        if (!skip){
            numberSkip = 0
        }
        if (!take){
            numberTake = (await client.post.findMany()).length
        }
        if (!filter){
            boolFilter = false
        }
    
        // Перевіряємо на валідність query даних, та повідомляємо користовачу коли він вказав щось не так
        if (isNaN(numberSkip)){
            // res.status(400).json("skip must be a number!")
            return "error"
        }
        if (isNaN(numberTake)){
            // res.status(400).json("take must be a number!")
            return "error"
        }
        if (!(typeof boolFilter === "boolean")) {
            // res.status(400).json("fitler must be a boolean")
            return "error"
        }
            
        const filteredPosts = await productRepository.getSplicedPosts(numberSkip, numberTake, boolFilter)
        return filteredPosts
    },

    getPostById: async (postId) => {
        const post = await productRepository.getPostById(postId)

        return post
    },
    addPostToJson: async (requestBody, token) => {
        const post = await productRepository.addPostToJson(requestBody, token)
        return post
    },
    updateDataPost: async (postId, postData, token) => {
        const post = await productRepository.updateDataPost(postId, postData, token)
        return post
    } ,
    deletePost: async (postId, token) => {
        const post = await productRepository.deletePost(postId, token)
        return post
    }
}

