const User = require("../models/user.model")
const db = require("../db")
const { BadRequestError } = require('../../utils/errors');

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
    getUserByUsername
}