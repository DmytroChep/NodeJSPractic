const path = require("path")
const fs = require("fs")
const fsPromises = require("fs/promises")


const jsonPathPosts = path.join(__dirname, "..", "..","posts.json")
const  productRepository = {
    postsFromJson : JSON.parse(fs.readFileSync(jsonPathPosts, "utf8")),
    addToJson: async(Massive, newObj) => {
        const massive = Massive
        massive.push(newObj)
        return await fsPromises.writeFile(jsonPathPosts, JSON.stringify(massive))
    }
}


module.exports = productRepository
