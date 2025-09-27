const moment = require("moment")
const express = require("express")
const path = require("path")
const fs = require("fs")
const { isNumberObject } = require("util/types")
const { isString } = require("util")


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

const jsonPath = path.join(__dirname, "posts.json")
const postsFromJson = JSON.parse(fs.readFileSync(jsonPath, "utf8"))

app.get("/posts", (req, res) => {
    const take = req.query.take !== undefined ? Number(req.query.take) : postsFromJson.length
    const skip = req.query.skip !== undefined ? Number(req.query.skip) : 0
    const filter = (req.query.filter ? undefined : false) ? undefined : true

    console.log(take)
    console.log(skip)
    console.log(filter)

    if(isNaN(skip) && isNaN(take)){
        res.status(400).json({status:"take or get must be int!"})
        return;
    }
    let filteredPosts = postsFromJson.slice(skip, take + skip)
    if (filter){
        filteredPosts = filteredPosts.filter((element) => {
            return element["title"].includes("a")
        })
    }
    res.status(200).json(filteredPosts)
    
})

app.get("/posts/:id", (req, res) => {
    const post = postsFromJson[req.params.id]
    if (post){
        res.status(200).json({post: postsFromJson[postId]})
        return
    } 
    res.status(404).json({"status": "not found"})

})

app.get("/timestamp", (req, res) => {
    res.status(200).json({date: getFullDate()})
})

app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}`)
})