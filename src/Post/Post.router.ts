const express = require("express")
const controller = require("./Post.controller")

export const postRouter = express.Router()

postRouter.get("/posts", controller.getSplicedPosts)
postRouter.get("/posts/:id", controller.getPostById)
postRouter.post("/posts", controller.addPostToJson)

