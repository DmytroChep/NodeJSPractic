import path from "path"
import {readFileSync} from "fs"
import {writeFile} from "fs/promises"

interface Ipost {
    title: string,
    description: string,
    image: string;
    id: number;
}

const jsonPathPosts = path.join(__dirname, "..", "..","posts.json")
export const  productRepository = {
    postsFromJson : JSON.parse(readFileSync(jsonPathPosts, "utf8")),
    addToJson: async(Array: Ipost[], newObj: Ipost) => {
        const array = Array
        array.push(newObj)
        return await writeFile(jsonPathPosts, JSON.stringify(array))
    }
}


