const express = require("express")
const router = express.Router()
const reviewController = require("../controllers/reviewController");

router.get('/allReviews', async (req, res) => {
    try {
      const reviews = await reviewController.getAllReviews()
      res.send(reviews);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      res.status(500).send({ error: { message: 'An error occurred while fetching reviews', details: err } });
    }
});

router.get('/getReviewsWithDetails', async (req, res) => {
  try {
    const reviews = await reviewController.getReviewsWithDetails()
    res.send(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).send({ error: { message: 'An error occurred while fetching reviews', details: err } });
  }
});

module.exports = router