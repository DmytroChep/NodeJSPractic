import { sign, verify } from "jsonwebtoken";
import { client } from "../client/client";
import { ENV } from "../config/env";
import type { Email, ServiceContract } from "./User.types";
import { UserRepository } from "./user.repository";

export const UserService: ServiceContract = {
	registration: async (UserData) => {
		const user = await UserRepository.registration(UserData);

		return user
	},
	login: async (UserData) => {
		const user = await UserRepository.login(UserData);
		if (!user) {
			return "user not found";
		}
		if (typeof user === "string") {
			return user;
		}

		return  sign({ email: user.email }, ENV.SECRET_KEY, {
			expiresIn: "7d",
		});
	},
	me: async (JWT) => {
		console.log(JWT);

		const email = verify(JWT, ENV.SECRET_KEY) as Email;

		const user = await UserRepository.me(email.email);

		if (typeof user === "string") {
			return user;
		}

		const { password, ...userWithoutPassword } = user;

		return userWithoutPassword;
	},
	getById: async (userId) => {
		const user = await UserRepository.getById(userId);

		return user;
	},
};
