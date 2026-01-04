import { readFileSync } from "fs";
import { writeFile } from "fs/promises";
import path from "path";
import { client } from "../client/client";
import { Prisma } from "../generated/prisma";
import {
	Createtag,
	type RepositoryContract,
	type tag,
	Updatetag,
} from "./Tag.types";

export const tagRepository: RepositoryContract = {
	getSplicedtags: async (skip, take, filter) => {
		try {
			// Створюємо мутабельні версії змінних які збеігають query параметри та перетворюємо їх у певні типи даних

			const tags = await client.tag.findMany({ take: take });

			console.log(skip);
			console.log(take);
			console.log(filter);
			let filteredtags: tag[] = tags.slice(skip, take + skip);
			if (filter) {
				filteredtags = filteredtags.filter((element: tag) => {
					return element.name.includes("a");
				});
			}
			return filteredtags;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2024") {
					return "error code P2024";
				}
			}
			throw error;
		}
	},
	gettagById: async (tagId) => {
		const tag = client.tag.findUnique({
			where: { id: tagId },
		});

		return tag;
	},
};
