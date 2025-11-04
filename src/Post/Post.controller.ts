// const postService = require("./Post.service")
import type {Request, Response} from "express"
import {postService} from "./Post.service"
import { ControllerContract } from "./Post.types"

export const postController: ControllerContract = {
    getSplicedPosts: (req, res): Promise<void> => {
        const skip = Number(req.query.skip)
        const take = Number(req.query.take)
        const filter = Boolean(req.query.filter)
        
        
        const response = postService.getSplicedPosts(skip, take, filter)

        // Повертаємо успіх зі зрізаним масивом постів
        res.status(200).json(response)
    },
    getPostById: async (req, res) => {
        const postId = Number(req.params.id)

        const response = postService.getPostById(postId)

        res.status(200).json(response)
    },
    addPostToJson: async (req, res) => {
        const requestBody = req.body

        const response = postService.addPostToJson(requestBody)


        res.status(200).json(response)
    },
    updateDataPost: async (req, res) => {
        const requestBody = req.body
        const postId = req.params.id
        
        const response = await postService.updateDataPost(postId, requestBody)

        res.status(200).json(response)
    },
    deletePost: async (req, res) => {
        const postId = req.params.id
        
        const response = await postService.deletePost(postId)

        res.status(200).json(response)
    }
}

