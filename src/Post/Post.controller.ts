// const postService = require("./Post.service")
import type { Request, Response } from "express";
import { postService } from "./Post.service";
import type { ControllerContract } from "./Post.types";

export const postController: ControllerContract = {
	getSplicedPosts: async (req, res) => {
		const skip = Number(req.query.skip);
		const take = Number(req.query.take);
		const filter = Boolean(req.query.filter);

		const response = await postService.getSplicedPosts(skip, take, filter);

		// Повертаємо успіх зі зрізаним масивом постів
		res.status(200).json(response);
	},
	getPostById: async (req, res) => {
		const postId = Number(req.params.id);
		const includesQueries = req.query.include as string | string[];
		console.log(includesQueries);

		const response = await postService.getPostById(postId, includesQueries);

		res.status(200).json(response);
	},
	addPostToJson: async (req, res) => {
		const requestBody = req.body;
		if (!req.headers.authorization) {
			res.status(400).json("user not login");
			return;
		}

		const response = await postService.addPostToJson(
			requestBody,
			res.locals.token,
		);

		res.status(200).json(response);
	},
	updateDataPost: async (req, res) => {
		const requestBody = req.body;
		const postId = Number(req.params.id);

		const response = await postService.updateDataPost(
			postId,
			requestBody,
			res.locals.token,
		);

		res.status(200).json(response);
	},
	deletePost: async (req, res) => {
		const postId = Number(req.params.id);

		const response = await postService.deletePost(postId, res.locals.token);

		res.status(200).json(response);
	},
	createComment: async (req, res) => {
		const postId = Number(req.params.id);
		const response = await postService.createComment(
			postId,
			req.body,
			res.locals.token,
		);

		res.status(200).json(response);
	},
	likePost: async (req, res) => {
		const postId = Number(req.params.id);
		const response = await postService.likePost(postId, res.locals.token);

		res.status(200).json(response);
	},
	unlikePost: async (req, res) => {
		const postId = Number(req.params.id);
		const response = await postService.unlikePost(postId, res.locals.token);

		res.status(200).json(response);
	},
	getPostWithRels: async (req, res) => {
		const postId = Number(req.params.id);

		const response = await postService.getPostWithRels(postId);
		res.status(200).json(response);
	},
    isLikedPost: async (req, res) => {
		const postId = Number(req.params.id);
        const token = res.locals.token
		const response = await postService.isLikedPost(postId, token);

		res.status(200).json(response);
	},
};
