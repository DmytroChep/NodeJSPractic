const express = require("express")
const controller = require("./Post.controller")

const router = express.Router()

router.get("/posts", controller.getSplicedPosts)
router.get("/posts/:id", controller.getPostById)
router.post("/posts", controller.addPostToJson)

module.exports = router