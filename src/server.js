const express = require("express")
const userRouter = require("./User/user.router")
const postRouter = require("./Post/Post.router")

const HOST = "127.0.0.1"
const PORT = 8000
const app = express()

app.use(express.json())
app.use(userRouter)
app.use(postRouter)


app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}`)
})