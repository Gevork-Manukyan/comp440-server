const express = require("express")
const { ForbiddenError } = require("../../utils/errors");
const router = express.Router()
const itemsController = require("../controllers/itemsController")
const userController = require("../controllers/userController")

router.get('/allItems', async (req, res, next) => {
    try {
      const items = await itemsController.getAllItems()
      res.send(items);
    } catch (err) {
      next(err)
    }
  });
  
router.get('/search', async (req, res, next) => {
    const { category_startswith } = req.query;
    try {
        let items;
        if (!category_startswith) {
            items = await itemsController.getAllItems()
        } 
        else {
            items = await itemsController.getAllWhere(category_startswith)
        }
        res.send(items);
    } catch (err) {
       next(err)
    }
});

router.post("/postItem", async (req, res, next) => {
  const item = req.body
  const user = res.locals.user
  
  try {
    const user_obj = await userController.fetchUserByEmail(user.email)
    const username = user_obj.username
    const check = await userController.checkUserPostsToday(username)
    
    if (!check) throw new ForbiddenError("Reached Maximum Daily Posts")

    await itemsController.postItem(username, item)
    res.status(201)
    
  } catch (err) {
    next(err)
  }
})

router.get("/mostExpensiveByCategory", async (req, res, next) => {
  try {
    

  } catch (err) {
    next(err)
  }
})


module.exports = router