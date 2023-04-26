const User = require("../models/user.model")
const Item = require("../models/item.model")
const Review = require("../models/review.model")
const db = require("../db")
const { BadRequestError } = require('../../utils/errors');
const sequelize = require("../db");


const login = async (credentials) => {
    const requiredFields = ['username', 'password'];
    requiredFields.forEach((field) => {
        if (!credentials?.hasOwnProperty(field)) {
            throw new BadRequestError(`Missing ${field} in request body.`);
        }
    })

    const user = await User.findOne({ where: { username: credentials.username } });

    if (user) {
        const isValid = credentials.password === user.password
        if (isValid) {
            return User.build({ username: user.username, email: user.email, firstName: user.firstName, lastName: user.lastName });
        }
    }

    throw new UnauthorizedError('Invalid Email or Password');
}
 
const register = async (credentials) => {
    const requiredFields = ['username', 'email', 'password', 'firstName', 'lastName'];
    requiredFields.forEach((field) => {
        if (!credentials?.hasOwnProperty(field)) {
            throw new BadRequestError(`Missing ${field} in request body.`);
        }
    })

    if (credentials.firstName.trim() === "" || credentials.lastName.trim() === "")
        throw new BadRequestError(`Invalid first or last name.`)

    if (credentials.email.indexOf('@') <= 0) {
        throw new BadRequestError('Invalid Email.');
    }

    if (credentials.password.trim() === "")
        throw new BadRequestError('Invalid Password')

    const existingUser = await fetchUserByEmail(credentials.email);
    if (existingUser) {
        throw new BadRequestError(`A user already exists with email: ${credentials.email}`);
    }

    const user = await User.create({ username: credentials.username, email: credentials.email, password: credentials.password, firstName: credentials.firstName, lastName: credentials.lastName });
    return {
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    }
}

async function checkUserPostsToday(username) {
    // get the current date
    const today = new Date();
    
    // count the number of posts made by the user today
    const count = await Item.count({
      where: {
        userUsername: username,
        datePosted: today
      },
    });
    
    // return true if the user has made no more than 3 posts today, false otherwise
    return count < 3;
}

async function checkUserReviewToday(username) {
    const today = new Date();
    
    const count = await Review.count({
      where: {
        userUsername: username,
        datePosted: today
      },
    });
    
    console.log("COUNT: ", count)
    return count < 3;
}

async function checkUserReviewingOwnItem(username, itemId) {
    // find the item with the given ID
    const item = await Item.findByPk(itemId);
  
    // check if the user with the given username is the owner of the item
    const isOwner = item.userUsername === username;
  
    // return true if the user is reviewing their own item, false otherwise
    return isOwner;
  }
  

async function fetchUserByEmail(email) {
    if (!email) {
        throw new BadRequestError('No email provided');
    }

    const user = await User.findOne({ where: { email } });
    return user?.dataValues
    
}

async function getUserByUsername(username) {
    const user = await User.findOne({
        where: { username: username }
    });

    return user
}

module.exports = {
    login,
    register, 
    fetchUserByEmail,
    checkUserPostsToday,
    checkUserReviewToday,
    checkUserReviewingOwnItem,
    getUserByUsername
}