const path = require("path")
const fs = require("fs")
const jsonPathUsers = path.join(__dirname, "..", "..","users.json")

const userRepository = {
    usersFromJson: JSON.parse(fs.readFileSync(jsonPathUsers, "utf8"))
}


module.exports = userRepository