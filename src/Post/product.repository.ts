import path from "path"
import {readFileSync} from "fs"
import {writeFile} from "fs/promises"
import { IPost } from "./Post.types"


export const jsonPathPosts = path.join(__dirname, "..", "..","posts.json")
export const  productRepository = {
    postsFromJson : JSON.parse(readFileSync(jsonPathPosts, "utf8")),
    addToJson: async(Array: IPost[], newObj: IPost) => {
        const array = Array
        array.push(newObj)
        return await writeFile(jsonPathPosts, JSON.stringify(array))
    },
}







