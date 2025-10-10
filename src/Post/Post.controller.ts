// const postService = require("./Post.service")
import type {Request, Response} from "express"
import {postService} from "./Post.service"

export const postController = {
    getSplicedPosts: (req: Request, res: Response) => {
        const skip = Number(req.query.skip)
        const take = Number(req.query.take)
        const filter = Boolean(req.query.filter)
        
        
        const response =  postService.getSplicedPosts(skip, take, filter)

        if (response.status === "error"){
            res.status(400).json("must be a number!")
        }

        // Повертаємо успіх зі зрізаним масивом постів
        res.status(200).json(response)
    },
    getPostById: (req:Request, res: Response) => {
        const postId = Number(req.params.id)

        const response = postService.getPostById(postId)
        if (response.status === "error"){
            res.status(404).json("post not fined")
        }

        res.status(200).json(response)
    },
    addPostToJson: (req: Request, res: Response) => {
        const requestBody = req.body

        const response = postService.addPostToJson(requestBody)

        if (response.status === "error"){
            res.status(200).json("error")
        }

        res.status(200).json(response)
    }
}

