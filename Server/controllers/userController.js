const User = require("../models/user.model")
const Item = require("../models/item.model")
const Review = require("../models/review.model")
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require('../../utils/errors');
const sequelize = require("../db");


const getAllUsers = async () => {
    const allUsers = await User.findAll();
    const cleanedUsers = allUsers.map(user => {
        return user.dataValues.username
    })
    return cleanedUsers
}

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

    throw new UnauthorizedError('Invalid Username or Password');
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

  async function checkUserReviewedItem(username, itemId) {
    // find the review with the given user and item IDs
    const existingReview = await Review.findOne({
      where: {
        userUsername: username,
        itemId: itemId
      }
    });
  
    // return true if a review already exists, false otherwise
    return existingReview !== null;
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

async function getTwoItemsDiffCategorySameDay(category1, category2) {
    const users = await sequelize.query(`
    SELECT u.username
    FROM users u
    INNER JOIN items i1 ON i1.userUsername = u.username
    INNER JOIN items i2 ON i2.userUsername = u.username AND i2.datePosted = i1.datePosted AND i2.id != i1.id
    INNER JOIN itemCategories ic1 ON ic1.itemId = i1.id
    INNER JOIN itemCategories ic2 ON ic2.itemId = i2.id
    INNER JOIN categories c1 ON c1.id = ic1.categoryId
    INNER JOIN categories c2 ON c2.id = ic2.categoryId
    WHERE c1.category = '${category1}'
      AND c2.category = '${category2}'
    GROUP BY u.username, i1.datePosted;    
    `)

    console.log("USERS: ", users)

    return users[0].map(e => {
        return e.username
    })
}

async function getExcellentGoodItemsForUser(username) {
    const items = await sequelize.query(`
    SELECT DISTINCT items.*
    FROM items
    INNER JOIN reviews ON items.id = reviews.itemId
    WHERE reviews.rating IN ('Excellent', 'Good')
    AND items.userUsername = '${username}'
    AND items.id NOT IN (
        SELECT DISTINCT itemId FROM reviews WHERE rating IN ('Fair', 'Poor')
    );
   
    `)

    return items[0]
}

async function getPopularUsers() {
    const users = await sequelize.query(`
    SELECT users.username, COUNT(items.id) AS total_items
    FROM users
    INNER JOIN items ON items.userUsername = users.username
    WHERE items.datePosted >= '2020-05-01'
    GROUP BY users.username
    HAVING COUNT(items.id) = (
      SELECT COUNT(items.id)
      FROM items
      WHERE items.userUsername = users.username AND items.datePosted >= '2020-05-01'
      GROUP BY items.userUsername
      ORDER BY COUNT(items.id) DESC
      LIMIT 1
    )
    ORDER BY total_items DESC;
    
    `)

    return users[0]
}

async function getNotExcellentUsers() {
    const users = await sequelize.query(`
    SELECT DISTINCT users.username
    FROM users
    LEFT JOIN items ON users.username = items.userUsername
    LEFT JOIN (
        SELECT itemId, COUNT(*) AS excellent_reviews_count
        FROM reviews
        WHERE rating = 'Excellent'
        GROUP BY itemId
    ) AS reviews_count ON items.id = reviews_count.itemId
    WHERE NOT EXISTS (
        SELECT *
        FROM items AS i
        JOIN (
            SELECT itemId, COUNT(*) AS excellent_reviews_count
            FROM reviews
            WHERE rating = 'Excellent'
            GROUP BY itemId
        ) AS rc ON i.id = rc.itemId
        WHERE i.userUsername = users.username AND rc.excellent_reviews_count >= 3
    );

    
    `)

    return users[0].map(e => {
        return e.username
    })
}

async function getNiceReviewers() {
    const users = await sequelize.query(`
    SELECT DISTINCT u.*
    FROM users u
    LEFT JOIN reviews r ON u.username = r.userUsername
    WHERE (r.rating IS NULL OR r.rating IN ('Excellent', 'Good', 'Fair'))
    AND u.username NOT IN (
      SELECT DISTINCT u2.username
      FROM users u2
      INNER JOIN reviews r2 ON u2.username = r2.userUsername
      WHERE r2.rating = 'Poor'
    );    
    `)

    return users[0].map(e => {
        return e.username
    })
}

async function getMeanReviewers() {
    const users = await sequelize.query(`
    SELECT DISTINCT u.username
    FROM users u
    JOIN reviews r ON u.username = r.userUsername
    WHERE r.rating = 'Poor'
    AND u.username NOT IN (
      SELECT DISTINCT u.username
      FROM users u
      JOIN reviews r ON u.username = r.userUsername
      WHERE r.rating IN ('Excellent', 'Good', 'Fair')
    );    
    `)

    return users[0].map(e => {
        return e.username
    })   
}

async function getGoodProducers() {
    const users = await sequelize.query(`
      SELECT u.*
      FROM users u
      WHERE EXISTS (
        SELECT 1
        FROM items i
        WHERE u.username = i.userUsername
        AND NOT EXISTS (
          SELECT 1
          FROM reviews r
          WHERE r.itemId = i.id AND r.rating = 'Poor'
        )
        AND NOT EXISTS (
          SELECT 1
          FROM reviews r
          WHERE r.itemId = i.id
        )
      )
      AND NOT EXISTS (
        SELECT 1
        FROM items i
        INNER JOIN reviews r ON i.id = r.itemId
        WHERE u.username = i.userUsername AND r.rating = 'Poor'
      )
    `);
  
    return users[0].map(e => e.username);
  }
  
  

async function getFriendUsers() {
    const users = await sequelize.query(`
    SELECT U1.username as User1, U2.username as User2
    FROM users AS U1 
    INNER JOIN reviews AS R1 ON U1.username = R1.userUsername
    INNER JOIN items AS I1 ON R1.itemId = I1.id 
    INNER JOIN users AS U2 ON U2.username = I1.userUsername 
    INNER JOIN reviews AS R2 ON U2.username = R2.userUsername 
    INNER JOIN items AS I2 ON R2.itemId = I2.id 
    WHERE R1.rating = 'Excellent' AND R2.rating = 'Excellent' 
      AND U1.username < U2.username 
      AND I1.userUsername != U1.username 
      AND I2.userUsername != U2.username 
      AND NOT EXISTS (
        SELECT *
        FROM items AS I 
        WHERE I.userUsername = U1.username 
          AND I.id NOT IN (
            SELECT R.itemId 
            FROM reviews AS R 
            WHERE R.userUsername = U2.username 
          )
      ) 
      AND NOT EXISTS (
        SELECT *
        FROM items AS I 
        WHERE I.userUsername = U2.username 
          AND I.id NOT IN (
            SELECT R.itemId 
            FROM reviews AS R 
            WHERE R.userUsername = U1.username 
          )
      )
    
    UNION 
    
    SELECT U1.username as User1, U2.username as User2
    FROM users AS U2 
    INNER JOIN reviews AS R2 ON U2.username = R2.userUsername 
    INNER JOIN items AS I2 ON R2.itemId = I2.id 
    INNER JOIN users AS U1 ON U1.username = I2.userUsername 
    INNER JOIN reviews AS R1 ON U1.username = R1.userUsername 
    INNER JOIN items AS I1 ON R1.itemId = I1.id 
    WHERE R2.rating = 'Excellent' AND R1.rating = 'Excellent' 
      AND U1.username < U2.username 
      AND I2.userUsername != U2.username 
      AND I1.userUsername != U1.username 
      AND NOT EXISTS (
        SELECT *
        FROM items AS I 
        WHERE I.userUsername = U1.username 
          AND I.id NOT IN (
            SELECT R.itemId 
            FROM reviews AS R 
            WHERE R.userUsername = U2.username 
          )
      ) 
      AND NOT EXISTS (
        SELECT *
        FROM items AS I 
        WHERE I.userUsername = U2.username 
          AND I.id NOT IN (
            SELECT R.itemId 
            FROM reviews AS R 
            WHERE R.userUsername = U1.username 
          )
      );
    
    `)

    console.log("USERS: ", users[0])

    return users[0]
}

async function getSameFriends(user1, user2) {
    const users = await sequelize.query(`
    SELECT DISTINCT fav1.favoritedUser
    FROM favoriteUsers fav1
    INNER JOIN favoriteUsers fav2 ON fav1.favoritedUser = fav2.favoritedUser
    WHERE fav1.user = '${user1}' AND fav2.user = '${user2}';    
    `)

    return users[0].map(e => {
        return e.favoritedUser
    })
}

module.exports = {
    login,
    register, 
    fetchUserByEmail,
    checkUserPostsToday,
    checkUserReviewToday,
    checkUserReviewingOwnItem,
    checkUserReviewedItem,
    getUserByUsername,
    getTwoItemsDiffCategorySameDay,
    getExcellentGoodItemsForUser,
    getPopularUsers,
    getNotExcellentUsers,
    getNiceReviewers,
    getMeanReviewers,
    getGoodProducers,
    getFriendUsers,
    getSameFriends,
    getAllUsers
}