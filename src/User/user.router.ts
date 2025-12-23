import { Router } from "express"
import { authMiddleware } from "../middlewares/auth-middleware"
import { UserController } from "./user.controller"

export const userRouter = Router()

userRouter.post("/user/registration", UserController.registration)
userRouter.post("/user/login", UserController.login)
userRouter.get("/user/me", authMiddleware, UserController.me)