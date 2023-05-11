const sequelize = require("../db");
const User = require("../models/user.model");
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