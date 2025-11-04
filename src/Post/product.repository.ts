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

        const posts = await client.post.findMany({take: take})


        console.log(skip)
        console.log(take)
        console.log(filter)
        let filteredPosts: Post[] = posts.slice(skip, take + skip)
        if (filter){
            filteredPosts = filteredPosts.filter((element: Post) => {
                return element.title.includes("a")
            })
        }
        return filteredPosts
    },
    getPostById: async (postId) => { 
        if (Number.isNaN(postId)){
            return {status: "error"}
        }
        const post =  client.post.findUnique({
            where: {id: postId}
        })
        // Якщо пост не знайден то повертаємо помилку не зайдено та завершуємо роботу функції 
        // if (!post){
        //     // res.status(404).json("post not fined")
        //     return {status: "error"}
        // } 
        // Повертаємо успіх
        // res.status(200).json({post: repositoriy.postsFromJson[postId]})
        return post
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
        return post
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






