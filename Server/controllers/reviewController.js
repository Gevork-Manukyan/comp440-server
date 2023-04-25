const Review = require("../models/review.model")
const Item = require("../models/item.model")
const User = require("../models/user.model")
const db = require("../db")


async function getAllReviews() {
  const reviews = await Review.findAll();
  return reviews
}

async function getReviewsWithDetails() {
  try {
    const reviews = await Review.findAll({
      attributes: ['id', 'rating', 'reviewDescription'],
      include: [
        {
          model: Item,
          attributes: ['title', 'price'],
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const reviews_cleaned = reviews.map(review => ({
      reviewId: review.id,
      username: review.user.username,
      title: review.item.title,
      price: review.item.price,
      rating: review.rating,
      description: review.reviewDescription,
    }));

    return reviews_cleaned

  } catch (error) {
    console.error(error);
  }
}

async function postReview(username, review) {
  Review.create({
    rating: review.rating,
    reviewDescription: review.reviewDescription,
    itemId: review.itemId,
    userUsername: username
  });
}

module.exports = {
    getAllReviews,
    getReviewsWithDetails,
    postReview
}