const express = require("express")
const router = express.Router()
const dbController = require("../controllers/dbController")


router.get("/initDB", (req, res, next) => {
    dbController.initDB()
    res.status(200)
})

router.get("/searchItemCategory", (req, res, next) => {
    res.status(200).json({result: "SUCCESS"})
})


module.exports = router