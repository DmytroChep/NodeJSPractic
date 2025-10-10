import {postRouter} from "./Post/Post.router"
import {userRouter} from "./User/user.router"
import express from 'express';

const HOST = "127.0.0.1"
const PORT = 8000
const app = express()

app.use(express.json())

app.use(postRouter)
app.use(userRouter)

app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}`)
})