require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()

//Routes
const userRoutes = require("./routes/user.route")

// Middleware
app.use(cors())
app.use(express.json())
app.use("/user", userRoutes)



/** Handle 404 errors -- this matches everything */
app.use((req, res, next) => {
    return next(new NotFoundError())
  })
  
  /** Generic error handler; anything unhandled goes here. */
  app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message
  
    return res.status(status).json({
      error: { message, status },
    })
  })

// start the Express server
app.listen(3003, () => {
    console.log("Server started on port http://localhost:3003")
})