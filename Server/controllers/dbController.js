const sequelize = require("../db");
const Item = require("../models/item.model");
const User = require("../models/user.model");
const Review = require("../models/review.model")
const Category = require("../models/category.model");
const FavoriteUsers = require("../models/favoritedUsers.model");

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
      return sequelize.query('DROP TABLE IF EXISTS favoriteUsers')
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
        userUsername: "BillyDoe123"
      });
      console.log("Item created:");
      return item
    })
    .then((item) => {
      Review.create({
        rating: "Excellent",
        reviewDescription: "This is a great product",
        itemId: item.id,
        userUsername: "BillyDoe123"
      });
      console.log("Review created:");
      return item
    })
    .then((item) => {
      const category1 = Category.create({
        category: 'Ball'
      });

      const category2 = Category.create({
        category: 'Weapon'
      });

      return Promise.all([item, category1, category2]);
    })
    .then(([item, category1, category2]) => {

      item.addCategory(category1);
      item.addCategory(category2);

    })
    .then(() => {
      FavoriteUsers.create({ user: "BillyDoe123", favoritedUser: "BrianDoe123" })
      FavoriteUsers.create({ user: "BillyDoe123", favoritedUser: "SteveDoe123" })
      FavoriteUsers.create({ user: "BrianDoe123", favoritedUser: "SteveDoe123" })
      FavoriteUsers.create({ user: "BrianDoe123", favoritedUser: "JohnDoe123" })
      FavoriteUsers.create({ user: "BillyDoe123", favoritedUser: "JohnDoe123" })
      FavoriteUsers.create({ user: "SteveDoe123", favoritedUser: "JohnDoe123" })
      FavoriteUsers.create({ user: "KevinDoe123", favoritedUser: "JohnDoe123" })
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = {
    initDB
}