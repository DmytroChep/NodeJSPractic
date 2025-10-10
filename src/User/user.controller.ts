import {userService} from "./user.service"
import type {Request, Response} from "express"

export const userController = {
    getAllUsers: (req: Request, res: Response) => {
        const response = userService.getAllUsers();
        res.status(200).json(response)
    },

    getUserFields: (req: Request, res: Response) => {
        const fields = String(req.query.fields)
        const userId = Number(req.params.id) - 1
        console.log(userId)

        const response = userService.getUserFields(fields, userId)

        if(response.status === "error"){
            res.status(400).json("field must have fields: id; username; email; password")
        } 

        // Повертаємо успіх
        res.status(200).json(response)
    }
}

