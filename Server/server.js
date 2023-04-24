require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const security = require("./middleware/security")
const sequelize = require('./db');
const ItemCategory = require("./models/item-category.model")


//Routes
const userRoutes = require("./routes/user.route")
const dbRoutes = require('./routes/database.route')
const itemsRoutes = require('./routes/items.route')
const categoryRoutes = require("./routes/category.route")

// Middleware
app.use(cors())
app.use(express.json())
app.use(security.extractUserFromJwt);
app.use("/user", userRoutes)
app.use("/db", dbRoutes)
app.use("/items", itemsRoutes)
app.use("/category", categoryRoutes)
sequelize.sync()

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