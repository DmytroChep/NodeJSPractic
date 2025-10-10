import {join} from "path"
import {readFileSync} from "fs"
const jsonPathUsers = join(__dirname, "..", "..","users.json")

export const userRepository = {
    usersFromJson: JSON.parse(readFileSync(jsonPathUsers, "utf8"))
}


