import { client } from "../client/client";
import { RepositoryContract} from "./User.types";

export const UserRepository: RepositoryContract = {
    registration: async (UserData) => {
        const user = client.user.create({
            data: UserData
        })

        return user
    },
    login: async (UserData) => {
        const user = await client.user.findUnique({where: {username: UserData.username}})

        return user
    }
}