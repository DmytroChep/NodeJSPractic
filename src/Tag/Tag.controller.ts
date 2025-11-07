// const tagService = require("./tag.service")
import type {Request, Response} from "express"
import {tagService} from "./Tag.service"
import { ControllerContract } from "./Tag.types"

export const tagController: ControllerContract = {
    getSplicedtags: async (req, res) => {
        const skip = Number(req.query.skip)
        const take = Number(req.query.take)
        const filter = Boolean(req.query.filter)
        
        
        const response = await tagService.getSplicedtags(skip, take, filter)

        // Повертаємо успіх зі зрізаним масивом постів
        res.status(200).json(response)
    },
    gettagById: async (req, res) => {
        const tagId = Number(req.params.id)

        const response = await tagService.gettagById(tagId)

        res.status(200).json(response)
    }
}

