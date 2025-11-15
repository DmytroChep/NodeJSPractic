import { Router } from "express"
import { UserController } from "./User.controller"

export const userRouter = Router()

userRouter.post("/user/registration", UserController.registration)
userRouter.post("/user/login", UserController.login)
userRouter.get("user/me", UserController.me)