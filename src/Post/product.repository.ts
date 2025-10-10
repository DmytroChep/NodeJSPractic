const path = require("path")
const fs = require("fs")
const fsPromises = require("fs/promises")
interface Ipost {
    title: string,
    description: string,
    image: string;
    id: number;
}

const jsonPathPosts = path.join(__dirname, "..", "..","posts.json")
const  productRepository = {
    postsFromJson : JSON.parse(fs.readFileSync(jsonPathPosts, "utf8")),
    addToJson: async(Array: Ipost[], newObj: Ipost) => {
        const array = Array
        array.push(newObj)
        return await fsPromises.writeFile(jsonPathPosts, JSON.stringify(array))
    }
}


module.exports = productRepository
