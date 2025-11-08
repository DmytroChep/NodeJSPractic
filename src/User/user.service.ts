import { UserRepository } from "./User.repository";
import { ServiceContract } from "./User.types";

export const UserService: ServiceContract = {
    registration: async (UserData) => {
        const user = await UserRepository.registration(UserData)

        return user
    },
    login: async (UserData) => {
        const user = await UserRepository.login(UserData)
        if (!user){
            return "user not found"
        }
        if (typeof user === "string"){
            return user
        }

        if (!(UserData.password === user.password)){
            return "password not correct"
        }
        
        return user
    }
}