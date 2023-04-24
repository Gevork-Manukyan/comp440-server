const express = require("express")
const router = express.Router()
const itemsController = require("../controllers/itemsController")

router.get('/allItems', async (req, res) => {
    try {
      const items = await itemsController.getAllItems()
      res.send(items);
    } catch (err) {
      console.error('Error fetching items:', err);
      res.status(500).send({ error: { message: 'An error occurred while fetching items', details: err } });
    }
  });
  
router.get('/search', async (req, res) => {
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
        console.error('Error fetching items with specified category:', err);
        res.status(500).send({ error: { message: 'An error occurred while fetching items with the specified category' } });
    }
});


module.exports = router