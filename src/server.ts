import cors from "cors";
import express from "express";
import { postRouter } from "./Post/Post.router";
import { tagRouter } from "./Tag/Tag.router";
import { userRouter } from "./User/user.router";

const HOST = "127.0.0.1";
const PORT = 8000;
const app = express();

app.use(express.json());

app.use(
	cors({
		origin: `http://localhost:3000`,
	}),
);
app.use(postRouter);
app.use(userRouter);
app.use(tagRouter);

app.listen(PORT, HOST, () => {
	console.log(`http://${HOST}:${PORT}`);
});
