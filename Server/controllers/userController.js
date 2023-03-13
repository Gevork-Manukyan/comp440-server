const User = require("../models/user.model")
const db = require("../db")
const { BadRequestError } = require('../../utils/errors');

const login = async (credentials) => {

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
}

function fetchUserByEmail(email) {
    if (!email) {
        throw new BadRequestError('No email provided');
    }

    const query = `SELECT * FROM users WHERE email = ? `;

    const result = db.query(query, [email.toLowerCase()], (err, results, fields) => {
        if (err) throw err
        console.log(results)
    });

    // console.log(result)
    // const user = result._rows[0];
    // console.log(user)

    // return user;
}

module.exports = {
    login,
    register
}