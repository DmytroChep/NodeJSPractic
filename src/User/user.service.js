"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
// const repositoriy = require("./user.repository")
const user_repository_1 = require("./user.repository");
exports.userService = {
    getAllUsers: () => {
        const user = [...user_repository_1.userRepository.usersFromJson];
        return user;
    },
    getUserFields: (fields, userId) => {
        let user = user_repository_1.userRepository.usersFromJson[userId];
        console.log(fields);
        // Якщо хоть який параметр є в query параметрах 
        if (fields) {
            // перетворюємо поля у масив
            const fieldsList = fields.split(",");
            console.log(fieldsList);
            // диструктуризуємо обьєкт користувача
            const { id, username, email, password } = user;
            console.log(id, username, email, password);
            user = {};
            // Перебираємо елементи масиву та якщо цей елемент співпадає з полем то заповнюємо в об'єкті корисутвача це поле
            fieldsList.forEach((element) => {
                if (element == "id") {
                    user.id = id;
                }
                else if (element == "username") {
                    user.username = username;
                }
                else if (element == "email") {
                    user.email = email;
                }
                else if (element == "password") {
                    user.password = password;
                }
            });
            // Якщо длина об'єкту ноль то повертаємо помилку 400 та завершуємо роботу функції
            if (Object.keys(user).length === 0) {
                return {
                    status: "error"
                };
            }
        }
        return user;
    }
};
//# sourceMappingURL=user.service.js.map