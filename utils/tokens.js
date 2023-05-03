const jwt = require("jsonwebtoken")
const { SECRET_KEY, JWT_EXPIRES_IN } = require("../config")

function generateToken (data) {
    return jwt.sign(data, SECRET_KEY, { expiresIn: JWT_EXPIRES_IN })
}

function createUserJwt (user) {
    const payload = {
        email: user.email
    }

    return generateToken(payload)
}

function validateToken (token) {
    const decodedToken = jwt.verify(token, SECRET_KEY)
    return decodedToken
}

module.exports = {
    createUserJwt,
    validateToken
}