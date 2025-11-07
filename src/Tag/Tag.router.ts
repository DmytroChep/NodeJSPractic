import { Router } from "express"
import { tagController } from "./Tag.controller"

export const tagRouter = Router()

tagRouter.get("/tags", tagController.getSplicedtags)
tagRouter.get("/tags/:id", tagController.gettagById)
