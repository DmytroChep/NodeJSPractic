import { Router } from "express"
import { postController } from "./Post.controller"

export const postRouter = Router()

postRouter.get("/posts", postController.getSplicedPosts)
postRouter.get("/posts/:id", postController.getPostById)
postRouter.post("/posts", postController.addPostToJson)
postRouter.patch("/posts/:id", postController.updateDataPost)