require("dotenv").config()
require("./db/connection")

const express = require("express")

const port = 5001 

const User = require("./user/model")
const userRouter = require("./user/routes")

const app = express()

app.use(express.json())
app.use(userRouter)

app.listen(port, () =>
    console.log( `Server is running on ${port}`)
)