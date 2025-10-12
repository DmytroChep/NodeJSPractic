"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get("/users", user_controller_1.userController.getAllUsers);
exports.userRouter.get("/user/:id", user_controller_1.userController.getUserFields);
//# sourceMappingURL=user.router.js.map