require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")

// Middleware
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World")
})


// start the Express server
app.listen(3003, () => {
    console.log("Server started on port http://localhost:3004")
})