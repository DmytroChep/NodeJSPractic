import path from "path"
import {readFileSync} from "fs"
import {writeFile} from "fs/promises"
import { CreatePost, Post, RepositoryContract, UpdatePost } from "./Post.types"
import { client } from "../client/client"


// // postsFromJson : JSON.parse(readFileSync(jsonPathPosts, "utf8")),
// addToJson: async(Array: CreatePost[], newObj: CreatePost) => {
//     const array = Array
//     array.push(newObj)
//     return await writeFile(jsonPathPosts, JSON.stringify(array))
// },
export const jsonPathPosts = path.join(__dirname, "..", "..","posts.json")

export const  productRepository:RepositoryContract = {
    getSplicedPosts: async (skip, take, filter) => {
        // Створюємо мутабельні версії змінних які збеігають query параметри та перетворюємо їх у певні типи даних
        let numberSkip = Number(skip)
        let numberTake = Number(take)
        let boolFilter = Boolean(filter)
        
        const posts = await client.post.findMany({take: take})
        
        // Ці умови потрібні щоб якщо query параметри не задані, задати стандартні дані
        if (!skip){
            numberSkip = 0
        }
        if (!take){
            if (posts){
                numberTake = posts.length
            }
        }
        if (!filter){
            boolFilter = false
        }
    
        // Перевіряємо на валідність query даних, та повідомляємо користовачу коли він вказав щось не так
        if (Number.isNaN(numberSkip)){
            // res.status(400).json("skip must be a number!")
            return {status:"error"}
        }
        if (Number.isNaN(numberTake)){
            // res.status(400).json("take must be a number!")
            console.log("bool")
            return {status:"error"}
        }
        if (!(typeof boolFilter === "boolean")) {
            // res.status(400).json("fitler must be a boolean")
            console.log("bool")
            return {status:"error"}
        }
        
        // Створення зрізаного масиву постів та якщо фільтр є, то цей масив фільтрується ще раз по букві 'a' у назві 
        console.log(numberSkip)
        console.log(numberTake)
        console.log(boolFilter)
        let filteredPosts: CreatePost[] = posts.slice(numberSkip, numberTake + numberSkip)
        if (boolFilter){
            filteredPosts = filteredPosts.filter((element: CreatePost) => {
                return element.title.includes("a")
            })
        }
        return {status: "success", posts: posts}
    },
    getPostById: async (postId) => {
        if (Number.isNaN(postId)){
            return {status: "error"}
        }
        const post = client.post.findUnique({
            where: {id: postId}
        })
        // Якщо пост не знайден то повертаємо помилку не зайдено та завершуємо роботу функції 
        if (!post){
            // res.status(404).json("post not fined")
            return {status: "error"}
        } 
        // Повертаємо успіх
        // res.status(200).json({post: repositoriy.postsFromJson[postId]})
        return {status: "success", post: post}
    },
    addPostToJson: async (requestBody) => {
        console.log(requestBody)
        // Якщо тіла запросу немає то повертаємо ошибку з одо 422 який означає що дані користувача не валідні, після чого завершємо функцію 
        if(!requestBody){
            // res.status(422).json("must be a body data")
            return {status: "error"}
        }
        // Якщо хоть один з обов'язкових значень нема у тілі запросу то повертаємо ошибку 422 та завершаэмо функцію
        if (!requestBody.title || !requestBody.description || !requestBody.image){
            // res.status(422).json("all of data will be in body")
            return {status: "error"}
        }
        const post = client.post.create({
            data: requestBody
        })

        // Повертаємо код успіху
        // res.status(200).json(post)
        return {status: "success", post: post}
    },

    updateDataPost: async (postId:number, postData: UpdatePost) => Promise<{status: string, post?: UpdatePost[]}>,
    deletePost: async (postId:number) => Promise<{status: string, post?: Post}>,
}


// getSplicedPosts: (skip: number, take: number, filter: boolean) => Promise<{status: string, posts?: Post[]}>,
//     getPostById: (postId: number) => Promise<{status: string, post?: Post}>,
//     addPostToJson: (requestBody: CreatePost) => Promise<{status: string, post?: CreatePost}>,
//     updateDataPost: (postId:number, postData: UpdatePost) => Promise<{status: string, post?: UpdatePost[]}>,
//     deletePost: (postId:number) => Promise<{status: string, post?: Post}>,
// }






