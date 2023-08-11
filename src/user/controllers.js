const User = require("./model")
const { fetchWeather } = require("../utils/index")


const register = async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        const successResponse = {
            message: "Success",
            newUser: newUser
        }
        res.status(201).json(successResponse)
    } catch (error) {
        const errorResponse = {
            message: "Error",
            error: error
        }
        res.status(501).json(errorResponse)
    }
}


const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (user === null){
            res.status(404).json({message: "User not found. Please check the details and try again"})
        } else {
            if (user.password === req.body.password){
                const weather = await fetchWeather(user.favourite)
                const successResponse = {
                message: "Login success",
                weather: {
                    place: weather.name,
                    description: weather.weather[0].description,
                    details: weather.main,
                    wind: weather.wind,
                    visibility: weather.visibility
                }
            }
            res.status(201).json(successResponse)
            } else {
                res.status(403).json({message: "Password does not match user, Please verify details"})
            }
        }
    } catch (error) {
        const errorResponse = {
            message: "Error",
            error: error
        }
        res.status(501).json(errorResponse)
    }
}

const notFound = async (req, res) => {
    res.status(404).json({message: "404 Page not Found"})
}


module.exports = {
    register,
    login,
    notFound
}