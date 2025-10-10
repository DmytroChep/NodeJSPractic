import { Router } from "express"
import { userController } from "./user.controller"
export const userRouter = Router()

userRouter.get("/users", userController.getAllUsers)
userRouter.get("/user/:id", userController.getUserFields)


