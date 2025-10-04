const repositoriy = require("./product.repository")

const postService = {
    getSplicedPosts: (skip, take, filter) => {
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
                numberTake = repositoriy.postsFromJson.length
            }
            if (!filter){
                boolFilter = false
            }
        
            // Перевіряємо на валідність query даних, та повідомляємо користовачу коли він вказав щось не так
            if (isNaN(numberSkip)){
                // res.status(400).json("skip must be a number!")
                return {status:"error"}
            }
            if (isNaN(numberTake)){
                // res.status(400).json("take must be a number!")
                return {status:"error"}
            }
            if (!typeof arg === "boolean") {
                // res.status(400).json("fitler must be a boolean")
                return {status:"error"}
            }
            
            // Створення зрізаного масиву постів та якщо фільтр є, то цей масив фільтрується ще раз по букві 'a' у назві 
            let filteredPosts = repositoriy.postsFromJson.slice(numberSkip, numberTake + numberSkip)
            if (boolFilter){
                filteredPosts = filteredPosts.filter((element) => {
                    return element.title.includes("a")
                })
            }
            
            return {status: "success", posts: filteredPosts}
    },

    getPostById: (postId) => {
        const post = repositoriy.postsFromJson[postId]
        // Якщо пост не знайден то повертаємо помилку не зайдено та завершуємо роботу функції 
        if (!post){
            // res.status(404).json("post not fined")
            return {status: "error"}
        } 
        // Повертаємо успіх
        // res.status(200).json({post: repositoriy.postsFromJson[postId]})
        return {status: "success", post: repositoriy.postsFromJson[postId]}
    },
    addPostToJson: (requestBody) => {
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
        const post = {
            title: String(requestBody.title),
            description: String(requestBody.description),
            image: String(requestBody.image)
        }
        // Отримаємо айді останнього поста та додаємо до нього один щоб отримати айді новго поста. Після чого додаємо айді до об'єкту поста
        const lastId = repositoriy.postsFromJson.at(-1).id + 1
        post.id = lastId
        // Використовуємо функцію для додавання в json наш об'єкт
        repositoriy.addToJson(repositoriy.postsFromJson, post)

        // Повертаємо код успіху
        // res.status(200).json(post)
        return {status: "success", post: post}
    }
}

module.exports = postService