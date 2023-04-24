const Review = require("../models/review.model")
const db = require("../db")


async function getAllReviews() {
    const reviews = await Review.findAll();
    return reviews
}

module.exports = {
    getAllReviews
}