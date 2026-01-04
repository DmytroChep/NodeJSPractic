// const repositoriy = require("./product.repository")
import type { Request } from "express";
import { writeFile } from "fs/promises";
import { client } from "../client/client";
import { tagRepository } from "./Tag.repository";
import { Createtag, type ServiceContract } from "./Tag.types";

export const tagService: ServiceContract = {
	getSplicedtags: async (skip, take, filter) => {
		// Отримуємо усі потрібні query параметри

		// Ці умови потрібні щоб якщо query параметри не задані, задати стандартні дані

		let numberSkip = Number(skip);
		let numberTake = Number(take);
		let boolFilter = Boolean(filter);
		if (!skip) {
			numberSkip = 0;
		}
		if (!take) {
			numberTake = (await client.tag.findMany()).length;
		}
		if (!filter) {
			boolFilter = false;
		}

		// Перевіряємо на валідність query даних, та повідомляємо користовачу коли він вказав щось не так
		if (isNaN(numberSkip)) {
			// res.status(400).json("skip must be a number!")
			return "error";
		}
		if (isNaN(numberTake)) {
			// res.status(400).json("take must be a number!")
			return "error";
		}
		if (!(typeof boolFilter === "boolean")) {
			// res.status(400).json("fitler must be a boolean")
			return "error";
		}

		const filteredtags = await tagRepository.getSplicedtags(
			numberSkip,
			numberTake,
			boolFilter,
		);
		return filteredtags;
	},

	gettagById: async (tagId) => {
		const tag = await tagRepository.gettagById(tagId);

		return tag;
	},
};
