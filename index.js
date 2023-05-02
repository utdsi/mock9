const express = require("express")
const{connection} = require("./config/db.js")
require('dotenv').config()

const app = express()

app.use(express.json())
app.get("/",(req,res)=>{
    res.send("welocme to socail media app")
})

app.listen(process.env.port,async()=>{
    try {
        await connection

        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }

    console.log(`listening on port ${process.env.port}`)
})

