// const repositoriy = require("./product.repository")
import type {Request} from "express"
import { productRepository } from "./product.repository"

interface Ipost {
    title: string,
    description: string,
    image: string;
    id: number;
}

export const postService = {
    getSplicedPosts: (skip: number, take: number, filter: boolean) => {
        // Отримуємо усі потрібні query параметри 
            
            
            // Створюємо мутабельні версії змінних які збеігають query параметри та перетворюємо їх у певні типи даних
            let numberSkip = Number(skip)
            let numberTake = Number(take)
            let boolFilter = Boolean(filter)
        
            // Ці умови потрібні щоб якщо query параметри не задані, задати стандартні дані
            if (!skip){
                numberSkip = 0
            }
            if (!take){
                numberTake = productRepository.postsFromJson.length
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
            let filteredPosts = productRepository.postsFromJson.slice(numberSkip, numberTake + numberSkip)
            if (boolFilter){
                filteredPosts = filteredPosts.filter((element: Ipost) => {
                    return element.title.includes("a")
                })
            }
            
            return {status: "success", posts: filteredPosts}
    },

    getPostById: (postId: number) => {
        const post = productRepository.postsFromJson[postId]
        // Якщо пост не знайден то повертаємо помилку не зайдено та завершуємо роботу функції 
        if (!post){
            // res.status(404).json("post not fined")
            return {status: "error"}
        } 
        // Повертаємо успіх
        // res.status(200).json({post: repositoriy.postsFromJson[postId]})
        return {status: "success", post: productRepository.postsFromJson[postId]}
    },
    addPostToJson: (requestBody: Ipost) => {
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
        // Після всіх перевірок переходимо до основного коду
        // Створюємо обьєкт поста  з даними із боді
        const post: Ipost = {
            title: String(requestBody.title),
            description: String(requestBody.description),
            image: String(requestBody.image),
            id: 0
        }
        // Отримаємо айді останнього поста та додаємо до нього один щоб отримати айді новго поста. Після чого додаємо айді до об'єкту поста
        const lastId = productRepository.postsFromJson.at(-1).id + 1
        post.id = lastId
        // Використовуємо функцію для додавання в json наш об'єкт
        productRepository.addToJson(productRepository.postsFromJson, post)

        // Повертаємо код успіху
        // res.status(200).json(post)
        return {status: "success", post: post}
    }
}

