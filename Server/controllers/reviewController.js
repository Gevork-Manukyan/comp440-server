const Review = require("../models/review.model")
const Item = require("../models/item.model")
const db = require("../db")



async function getAllReviews() {
    const reviews = await Review.findAll();
    return reviews
}

async function getAllReviewsWithProductInfo() {
    const reviews = await Review.findAll({
        attributes: ['id', 'rating', 'reviewDescription'],
        include: {
          model: Item,
          attributes: ['title', 'description', 'datePosted', 'price']
        }
      });
    return reviews
}

module.exports = {
    getAllReviews,
    getAllReviewsWithProductInfo
}