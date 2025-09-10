const moment = require("moment")

const date = moment()

function getCurrentDay(){
    console.log(date.format("dddd"))
}

function getCurrentMonth(){
    console.log(date.format("MMMM"))
}

function getCurrentYear(){
    console.log(date.format("YYYY"))
}


getCurrentDay()
getCurrentMonth()
getCurrentYear()

//2

function getDate(){
    console.log(date.format("L LTS"))
}

getDate()