import { client } from "../client/client";
import {sign, verify} from "jsonwebtoken";
import { UserRepository } from "./User.repository";
import { Email, ServiceContract } from "./User.types";
import { ENV } from "../config/env";

export const UserService: ServiceContract = {
    registration: async (UserData) => {
        const user = await UserRepository.registration(UserData)

        if (typeof user === "string"){
            return user
        }

        return sign({email: user.email}, ENV.SECRET_KEY, {
            expiresIn: "7d"
        })
    },
    login: async (UserData) => {
        const user = await UserRepository.login(UserData)
        if (!user){
            return "user not found"
        }
        if (typeof user === "string"){
            return user
        }

        
        
        return user
    },
    me: async (JWT) => {
        console.log(JWT)
        
        
        
        const email = verify(JWT, ENV.SECRET_KEY) as Email;


        const user = await UserRepository.me(email.email);

        if (typeof user === "string"){
            return user
        }

        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword
    }
}