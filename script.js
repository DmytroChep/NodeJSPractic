const moment = require("moment")
const express = require("express")
const path = require("path")
const fs = require("fs")
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

const jsonPathPosts = path.join(__dirname, "posts.json")
const jsonPathUsers = path.join(__dirname, "users.json")

const postsFromJson = JSON.parse(fs.readFileSync(jsonPathPosts, "utf8"))

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

app.get("/posts/:id", (req, res) => {
    const post = postsFromJson[req.params.id]
    if (!post){
        res.status(404).json("post not fined")
        return
    } 
    res.status(200).json({post: postsFromJson[postId]})

})

app.get("/users", (req, res) => {
    const user = [...usersFromJson]
    
    
    res.status(200).json(user)
})

app.get("/user/:id", (req, res) => {
    let user = usersFromJson[Number(req.params.id) - 1]
    const fields = req.query.fields
    console.log(Array(fields))
    if (fields){
        const fieldsList = fields.split(",")
        console.log(fieldsList)
        const {id, username, email, password} = user
        console.log(id, username, email, password)
        user = {}
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
       
        if (Object.keys(user).length === 0){
            res.status(400).json("field must have fields: id; username; email; password")
            return
        }
    }

    res.status(200).json(user)
})

app.get("/timestamp", (req, res) => {
    res.status(200).json({date: getFullDate()})
})

app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}`)
})