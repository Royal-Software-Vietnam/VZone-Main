require('dotenv').config()
import express = require("express")
import cors = require("cors")
import mongoose = require("mongoose")
import bodyparser = require("body-parser")
import user from "./router/user"

mongoose.connect(process.env.DATABASE as string).then(() => {
    console.log("Connected to database")
}).catch((error) => console.log(error))

const app = express()
app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use("/user", user)

app.listen(4444, () => console.log("Main server is running"))