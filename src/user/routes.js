const { Router } = require("express")
const userRouter = Router()

const { register, login, notFound } = require("./controllers")

userRouter.post("/user/register", register)
userRouter.get("/user/login", login)
userRouter.get("*", notFound)

module.exports = userRouter