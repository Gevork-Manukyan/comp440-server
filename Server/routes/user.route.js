const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")


// Login Endpoint
router.post("/login", async (req, res) => {
    const response = await userController.login(req, res)

    if (response === false) {
        res.status(401).send({ error: "Email or password is invalid." })
    } else {
        res.status(200).send(response)
    }
})

// Register Endpoint 
router.post("/register", async (req, res) => {
    const response = await userController.register(req.body)

    res.status(200).send(response)
})

module.exports = router