const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")


// Login Endpoint
router.post("/login", async (req, res, next) => {
    try {
        const response = await userController.login(req.body)
        res.status(200).json(response)

    } catch (err) {
        next(err)
    }    
})

// Register Endpoint 
router.post("/register", async (req, res, next) => {
    try {
        const response = await userController.register(req.body)
        res.status(200).json(response)
    
    } catch (err) {
        next(err)
    }
})

module.exports = router