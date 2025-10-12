"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_router_1 = require("./Post/Post.router");
const user_router_1 = require("./User/user.router");
const express_1 = __importDefault(require("express"));
const HOST = "127.0.0.1";
const PORT = 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(Post_router_1.postRouter);
app.use(user_router_1.userRouter);
app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}`);
});
//# sourceMappingURL=server.js.map