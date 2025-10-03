const moment = require("moment")
const express = require("express")
const path = require("path")
const fs = require("fs")
const fsPromises = require("fs/promises")
const { isNumberObject } = require("util/types")
const { isString } = require("util")
const { isBoolean } = require("util")
const { isNumber } = require("util")


// const date = moment()

// function getCurrentDay(){
//     console.log(date.format("dddd"))
// }

// function getCurrentMonth(){
//     console.log(date.format("MMMM"))
// }

// function getCurrentYear(){
//     console.log(date.format("YYYY"))
// }


// getCurrentDay()
// getCurrentMonth()
// getCurrentYear()

// //2

// function getDate(){
//     console.log(date.format("L LTS"))
// }

// getDate()


// function getWeekDay(){
//     console.log("date geted with split:\n",date.format("LLLL").split(",")[0])
// }

// getWeekDay()    

function getFullDate(){
    return moment().format("LLLL")
}


const HOST = "127.0.0.1"
const PORT = 8000

const app = express()
app.use(express.json())

const jsonPathPosts = path.join(__dirname, "posts.json")
const jsonPathUsers = path.join(__dirname, "users.json")

let postsFromJson = JSON.parse(fs.readFileSync(jsonPathPosts, "utf8"))

const usersFromJson = JSON.parse(fs.readFileSync(jsonPathUsers, "utf8"))

app.get("/posts", (req, res) => {
    // Отримуємо усі потрібні query параметри 
    const skip = req.query.skip
    const take = req.query.take
    const filter = req.query.filter
    
    // Створюємо мутабельні версії змінних які збеігають query параметри та перетворюємо їх у певні типи даних
    let numberSkip = Number(skip)
    let numberTake = Number(take)
    let boolFilter = Boolean(filter)

    // Ці умови потрібні щоб якщо query параметри не задані, задати стандартні дані
    if (!skip){
        numberSkip = 0
    }
    if (!take){
        numberTake = postsFromJson.length
    }
    if (!filter){
        boolFilter = false
    }

    // Перевіряємо на валідність query даних, та повідомляємо користовачу коли він вказав щось не так
    if (isNaN(numberSkip)){
        res.status(400).json("skip must be a number!")
        return
    }
    if (isNaN(numberTake)){
        res.status(400).json("take must be a number!")
        return
    }
    if (!isBoolean(boolFilter)) {
        res.status(400).json("fitler must be a boolean")
        return
    }
    
    // Створення зрізаного масиву постів та якщо фільтр є, то цей масив фільтрується ще раз по букві 'a' у назві 
    let filteredPosts = postsFromJson.slice(numberSkip, numberTake + numberSkip)
    if (boolFilter){
        filteredPosts = filteredPosts.filter((element) => {
            return element.title.includes("a")
        })
    }
    
    // Повертаємо успіх зі зрізаним масивом постів
    res.status(200).json(filteredPosts)
    
})
// Створюємо асинхрону функцію для додавання обьекту у масивв
async function addToJson(Massive, newObj) {
    const massive = Massive
    massive.push(newObj)
    return await fsPromises.writeFile(jsonPathPosts, JSON.stringify(massive))
}
// Функція для обробки пост запросу по ендоінту /posts
app.post("/posts", (req, res) => {
    // Отримуємо тіло пост запросу
    const requestBody = req.body
    console.log(requestBody)
    // Якщо тіла запросу немає то повертаємо ошибку з одо 422 який означає що дані користувача не валідні, після чого завершємо функцію 
    if(!requestBody){
        res.status(422).json("must be a body data")
        return
    }
    // Якщо хоть один з обов'язкових значень нема у тілі запросу то повертаємо ошибку 422 та завершаэмо функцію
    if (!requestBody.title || !requestBody.description || !requestBody.image){
        res.status(422).json("all of data will be in body")
        return
    }
    // Після всіх перевірок переходимо до основного коду
    // Створюємо обьєкт поста  з даними із боді
    const post = {
        title: String(requestBody.title),
        description: String(requestBody.description),
        image: String(requestBody.image)
    }
    // Отримаємо айді останнього поста та додаємо до нього один щоб отримати айді новго поста. Після чого додаємо айді до об'єкту поста
    const lastId = postsFromJson.at(-1).id + 1
    post.id = lastId
    // Використовуємо функцію для додавання в json наш об'єкт
    addToJson(postsFromJson, post)

    // Повертаємо код успіху
    res.status(200).json(post)
})

// Функція для обробки гет запросу по ендоінту /posts/:id
app.get("/posts/:id", (req, res) => {
    // отримаємо пост за айді которий ми отримали з рут параметрів
    const post = postsFromJson[req.params.id]
    // Якщо пост не знайден то повертаємо помилку не зайдено та завершуємо роботу функції 
    if (!post){
        res.status(404).json("post not fined")
        return
    } 
    // Повертаємо успіх
    res.status(200).json({post: postsFromJson[postId]})

})

// Функція для обробки гет запросу по ендоінту /users
app.get("/users", (req, res) => {
    // Оримуємо всіх користувачів та повертаємо успіх
    const user = [...usersFromJson]
    
    res.status(200).json(user)
})
// Функція для обробки гет запросу по ендоінту /user/:id
app.get("/user/:id", (req, res) => {
    // Отримуємо потрібні дані з query параметрів та рут параметрів 
    let user = usersFromJson[Number(req.params.id) - 1]
    const fields = req.query.fields
    console.log(Array(fields))
    // Якщо хоть який параметр є в query параметрах 
    if (fields){
        // перетворюємо поля у масив
        const fieldsList = fields.split(",")
        console.log(fieldsList)
        // диструктуризуємо обьєкт користувача
        const {id, username, email, password} = user
        console.log(id, username, email, password)
        user = {}
        // Перебираємо елементи масиву та якщо цей елемент співпадає з полем то заповнюємо в об'єкті корисутвача це поле
        fieldsList.forEach((element) => {
            if(element == "id"){
                user.id = id
            } else if(element == "username"){
                user.username = username
            } else if(element == "email"){
                user.email = email
            } else if(element == "password"){
                user.password = password
            }
        });

        // Якщо длина об'єкту ноль то повертаємо помилку 400 та завершуємо роботу функції
        if (Object.keys(user).length === 0){
            res.status(400).json("field must have fields: id; username; email; password")
            return
        }
    }

    // Повертаємо успіх
    res.status(200).json(user)
})

app.get("/timestamp", (req, res) => {
    res.status(200).json({date: getFullDate()})
})

app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}`)
})