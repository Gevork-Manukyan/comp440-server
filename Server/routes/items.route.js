const express = require("express")
const router = express.Router()
const itemsController = require("../controllers/itemsController")

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
  const data = req.body
  console.log(data)
  try {
    
  } catch (err) {
    next(err)
  }
})


module.exports = router