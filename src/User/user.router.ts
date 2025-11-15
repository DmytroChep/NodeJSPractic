import { Router } from "express"
import { UserController } from "./User.controller"
import { authMiddleware } from "../middlewares/auth-middleware"

export const userRouter = Router()

userRouter.post("/user/registration", UserController.registration)
userRouter.post("/user/login", UserController.login)
userRouter.get("/user/me", authMiddleware, UserController.me)