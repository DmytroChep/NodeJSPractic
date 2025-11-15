import { UserService } from "./user.service";
import { ControllerContract } from "./User.types";

export const UserController: ControllerContract = {
    registration: async (req, res) => {
        const body = req.body
        
        const response = await UserService.registration(body)

        if (typeof response === "string"){
            res.status(400).json(response)
            return
        }

        res.status(200).json(response)
    },
    login: async (req, res) => {
        const body = req.body
        
        const response = await UserService.login(body)

        if (typeof response === "string"){
            res.status(400).json(response)
            return
        }

        res.status(200).json(response)
    },
    me: async (req, res) => {
        
        const response = await UserService.me(res.locals.token);

        if (typeof response === "string"){
            res.status(400).json(response)
            return
        }

        if (!response){
            res.status(404).json("user not found")
            return
        }

        res.status(200).json(response)
    }
}