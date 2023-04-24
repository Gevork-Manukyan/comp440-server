const sequelize = require("../db");
const Item = require("../models/item.model");
const User = require("../models/user.model");
const Review = require("../models/review.model")

const initDB = () => {
    sequelize.sync({ force: true })
    .then(() => {
      console.log('Users table created');

        User.create({ username: "JohnDoe123", email: "JohnDoe@gmail.com", password: "password123", firstName: "John", lastName: "Doe" });
        User.create({ username: "BillyDoe123", email: "BillyDoe@gmail.com", password: "password123", firstName: "Billy", lastName: "Doe" });
        User.create({ username: "SteveDoe123", email: "SteveDoe@gmail.com", password: "password123", firstName: "Steve", lastName: "Doe" });
        User.create({ username: "KevinDoe123", email: "KevinDoe@gmail.com", password: "password123", firstName: "Kevin", lastName: "Doe" });
        User.create({ username: "BrianDoe123", email: "BrianDoe@gmail.com", password: "password123", firstName: "Brian", lastName: "Doe" });


        Item.create({
          title: 'Example Item',
          description: 'This is an example item.',
          price: 10.99
        }).then(item => {
          console.log('Item created:');
          Review.create({
            rating: 'Excellent',
            reviewDescription: 'This is a great product',
            itemId: item.id
          }).then(review => {
            console.log('Review created:');
          }).catch(error => {
            console.error('Error creating review:', error);
          })
        }).catch(error => {
          console.error('Error creating item:', error);
        })

    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = {
    initDB
}