const moment = require("moment")
const express = require("express")
const path = require("path")
const fs = require("fs")


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
    const filter = Boolean(req.query.filter)
    console.log(filter)
    if (filter === true){
        const filteredPostsFromJson = postsFromJson.map((element) => {
            if (element["title"].includes("a")){
                return element
            }
        })

        const skipElements = Number(req.query.skip)
        const getElements = req.query.take 

        if(getElements === undefined){
            const finalPosts = filteredPostsFromJson.slice(skipElements)
            res.status(404).json(finalPosts) 
            return;
        }
        const finalgetElements = Number(req.query.take)
        
        
        if(isNaN(skipElements) || isNaN(finalgetElements)){
            res.status(400).json({status:"take or get must be int!"})
            return;
        }

        const finalPosts = filteredPostsFromJson.slice(skipElements, finalgetElements + skipElements)
        res.status(200).json(finalPosts)
    } else{
        const skipElements = Number(req.query.skip)
        const getElements = req.query.take 
        
        if(getElements === undefined){
            const finalPosts = postsFromJson.slice(skipElements)
            res.status(404).json(finalPosts) 
            return;
        }
        const finalgetElements = Number(req.query.take)
        
        if(isNaN(skipElements) || isNaN(finalgetElements)){
            res.status(400).json({status:"take or get must be int!"})
            return;
        }

        const finalPosts = postsFromJson.slice(skipElements, finalgetElements + skipElements)
        res.status(200).json(finalPosts)
    }
        
})

app.get("/posts/:id", (req, res) => {
    const post = postsFromJson[req.params.id]
    if (post){
        res.status(200).json({post: postsFromJson[postId]})
    } else{
        res.status(404).json({"status": "not found"})
    }
})

app.get("/timestamp", (req, res) => {
    res.status(200).json({date: getFullDate()})
})

app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}`)
})