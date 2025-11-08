import { UserService } from "./user.service";
import { ControllerContract } from "./User.types";

export const UserController: ControllerContract = {
    registration: async (req, res) => {
        const body = req.body
        
        const response = await UserService.registration(body)

        res.status(200).json(response)
    },
    login: async (req, res) => {
        const body = req.body
        
        const response = await UserService.login(body)

        res.status(200).json(response)
    }
}