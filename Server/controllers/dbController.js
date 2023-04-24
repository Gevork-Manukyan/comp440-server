const sequelize = require("../db");
const Item = require("../models/item.model");
const User = require("../models/user.model");
const Review = require("../models/review.model")
const Category = require("../models/category.model")

const initDB = () => {
    sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(() => {
        return sequelize.query('DROP TABLE IF EXISTS reviews');
    })
    .then(() => {
        return sequelize.query('DROP TABLE IF EXISTS item_category');
    })
    .then(() => {
        return sequelize.query('DROP TABLE IF EXISTS items');
    })
    .then(() => {
        return sequelize.query('DROP TABLE IF EXISTS categories');
    })
    .then(() => {
      return sequelize.query('DROP TABLE IF EXISTS users');
    })
    .then(() => {
      return sequelize.sync({ force: true })
    })
    .then(() => {

        User.create({ username: "JohnDoe123", email: "JohnDoe@gmail.com", password: "password123", firstName: "John", lastName: "Doe" });
        User.create({ username: "BillyDoe123", email: "BillyDoe@gmail.com", password: "password123", firstName: "Billy", lastName: "Doe" });
        User.create({ username: "SteveDoe123", email: "SteveDoe@gmail.com", password: "password123", firstName: "Steve", lastName: "Doe" });
        User.create({ username: "KevinDoe123", email: "KevinDoe@gmail.com", password: "password123", firstName: "Kevin", lastName: "Doe" });
        User.create({ username: "BrianDoe123", email: "BrianDoe@gmail.com", password: "password123", firstName: "Brian", lastName: "Doe" });        

    })
    .then(() => {
      const item = Item.create({
        title: "Example Item",
        description: "This is an example item.",
        price: 10.99,
      });
      console.log("Item created:");
      return item
    })
    .then((item) => {
      Review.create({
        rating: "Excellent",
        reviewDescription: "This is a great product",
        itemId: item.id,
      });
      console.log("Review created:");
      return item
    })
    .then((item) => {
      const category = Category.create({
        name: 'New Category'
      });

      return Promise.all([item, category]);
    })
    .then(([item, category]) => {
      


    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = {
    initDB
}