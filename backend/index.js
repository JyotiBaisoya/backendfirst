const express = require("express");
const {connection} = require("./config/db")
const app = express();
const {userRouter} = require("./routes/user_router")
const {authenticator} = require ("./middlewares/authenticator")
const {postRouter} = require("./routes/postrouter")
require ("dotenv").config()
const cors = require("cors");
app.use(cors())



app.use(express.json())

app.use("/users",userRouter)
app.use(authenticator)

app.use("/posts",postRouter)



app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log("not connected");
        console.log(error)
    }
    console.log("Running on 4500")
})