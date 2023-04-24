const express = require("express")
const router = express.Router()
const reviewController = require("../controllers/")

router.get('/reviews', async (req, res) => {
    try {
      const reviews = await Reviews.findAll();
      res.send(reviews);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      res.status(500).send({ error: { message: 'An error occurred while fetching reviews', details: err } });
    }
  });

module.exports = router