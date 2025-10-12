"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
exports.userController = {
    getAllUsers: (req, res) => {
        const response = user_service_1.userService.getAllUsers();
        res.status(200).json(response);
    },
    getUserFields: (req, res) => {
        const fields = String(req.query.fields);
        const userId = Number(req.params.id) - 1;
        console.log(userId);
        const response = user_service_1.userService.getUserFields(fields, userId);
        if (response.status === "error") {
            res.status(400).json("field must have fields: id; username; email; password");
        }
        // Повертаємо успіх
        res.status(200).json(response);
    }
};
//# sourceMappingURL=user.controller.js.map