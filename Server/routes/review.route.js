const express = require("express")
const router = express.Router()
const reviewController = require("../controllers/reviewController");
const userController = require("../controllers/userController")

router.get('/allReviews', async (req, res, next) => {
    try {
      const reviews = await reviewController.getAllReviews()
      res.send(reviews);
    } catch (err) {
      next(err)
    }
});

router.get('/getReviewsWithDetails', async (req, res, next) => {
  try {
    const reviews = await reviewController.getReviewsWithDetails()
    res.send(reviews);
  } catch (err) {
    next(err)
  }
});

router.post("/postReview", async (req, res, next) => {
  const review = req.body
  const user = res.locals.user
  
  try {
    const user_obj = await userController.fetchUserByEmail(user.email)
    const username = user_obj.username
    const check = await userController.checkUserReviewToday(username)
    console.log("CHECK: ", check)

    if (!check) throw Error("REVIEW LIMIT REACHED")

    await reviewController.postReview(username, review)
    res.status(201)
  } catch (err) {
    next(err)
  }
})

module.exports = router