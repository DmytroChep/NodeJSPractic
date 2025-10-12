"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const jsonPathUsers = (0, path_1.join)(__dirname, "..", "..", "users.json");
exports.userRepository = {
    usersFromJson: JSON.parse((0, fs_1.readFileSync)(jsonPathUsers, "utf8"))
};
//# sourceMappingURL=user.repository.js.map