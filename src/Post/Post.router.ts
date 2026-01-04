import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { postController } from "./Post.controller";

export const postRouter = Router();

postRouter.get("/posts", postController.getSplicedPosts);
postRouter.get("/posts/:id", postController.getPostById);
postRouter.post("/posts", authMiddleware, postController.addPostToJson);
postRouter.patch("/posts/:id", authMiddleware, postController.updateDataPost);
postRouter.delete("/posts/:id", authMiddleware, postController.deletePost);

postRouter.post(
	"/posts/:id/comments",
	authMiddleware,
	postController.createComment,
);

postRouter.put("/posts/:id/likes", authMiddleware, postController.likePost);
postRouter.delete(
	"/posts/:id/likes",
	authMiddleware,
	postController.unlikePost,
);
postRouter.get("/posts/:id/postWithRels", postController.getPostWithRels)
postRouter.get("/posts/isLiked/:id", authMiddleware, postController.isLikedPost)