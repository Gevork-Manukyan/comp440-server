const sequelize = require("../db");
const User = require("../models/user.model");

const initDB = () => {
    sequelize.sync({ force: true })
    .then(() => {
      console.log('Users table created');

        User.create({ username: "JohnDoe123", email: "JohnDoe@gmail.com", password: "password123", firstName: "John", lastName: "Doe" });
        User.create({ username: "BillyDoe123", email: "BillyDoe@gmail.com", password: "password123", firstName: "Billy", lastName: "Doe" });
        User.create({ username: "SteveDoe123", email: "SteveDoe@gmail.com", password: "password123", firstName: "Steve", lastName: "Doe" });
        User.create({ username: "KevinDoe123", email: "KevinDoe@gmail.com", password: "password123", firstName: "Kevin", lastName: "Doe" });
        User.create({ username: "BrianDoe123", email: "BrianDoe@gmail.com", password: "password123", firstName: "Brian", lastName: "Doe" });


    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = {
    initDB
}