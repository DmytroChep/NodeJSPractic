import { Router } from "express"
import { postController } from "./Post.controller"
import { authMiddleware } from "../middlewares/auth-middleware"

export const postRouter = Router()

postRouter.get("/posts", postController.getSplicedPosts)
postRouter.get("/posts/:id", postController.getPostById)
postRouter.post("/posts", authMiddleware, postController.addPostToJson)
postRouter.patch("/posts/:id", authMiddleware, postController.updateDataPost)
postRouter.delete("/posts/:id", authMiddleware, postController.deletePost)