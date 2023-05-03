const jwt = require("jsonwebtoken")
const { UnauthorizedError } = require("../../utils/errors");
const tokens = require("../../utils/tokens")


// Extract the JWT from the request header
function extractJwtHeader ({ headers }) {
    if (headers?.authorization) {
        const [scheme, token] = headers.authorization.split(" ");
        if (scheme.trim() === "Bearer") {
            return token;
        }
    }

    return null
}

// Extract user from the JWT token
const extractUserFromJwt = (req, res, next) => {

    try {
        const token = extractJwtHeader(req);
        if (token) {
            res.locals.user = tokens.validateToken(token)
        }
        
        return next(); 

    } catch (error) {
        return next(error);
    }
}

// Verify if a authenticated user exists
const requireAuthenticatedUser = (req, res, next) => {
    try {
        const { user } = res.locals;
        if(!user?.email) {
            throw new UnauthorizedError();
        }
        return next();

    } catch (error) {

        return next(error);
    }
}

module.exports = {
    extractJwtHeader,
    extractUserFromJwt,
    requireAuthenticatedUser
}