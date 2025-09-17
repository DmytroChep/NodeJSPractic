const moment = require("moment")
const express = require("express")

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


app.get("/timestamp", (req, res) => {
    res.status(418).json({date: getFullDate()})
})

app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}`)
})