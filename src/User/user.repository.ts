import { client } from "../client/client";
import { RepositoryContract} from "./User.types";

export const UserRepository: RepositoryContract = {
    registration: async (UserData) => {
        const user = client.user.create({
            data: UserData
        })

        if (client.user.findUnique({
            where: {email: UserData.email}
        }) != null){
            return "user already exists!"
        }

        return user
    },
    login: async (UserData) => {
        const user = await client.user.findUnique({where: {email: UserData.email}})
        if (user == null){
            return "user doesn't exists"
        }
        if (!(UserData.password === user.password)){
            return "password not correct"
        }

        return user
    },
    me: async (UserEmail) => {
        const user = await client.user.findUnique({where: {email: UserEmail}})
        if (user === null){
            return "user not found"
        }
        return user
    }
}