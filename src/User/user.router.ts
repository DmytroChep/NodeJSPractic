const express = require("express")
const userController = require('./user.controller')

export const userRouter = express.Router()

userRouter.get("/users", userController.getAllUsers)
userRouter.get("/user/:id", userController.getUserFields)


