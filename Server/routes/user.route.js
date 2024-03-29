const express = require("express")
const router = express.Router()
const tokens = require('../../utils/tokens');
const userController = require("../controllers/userController")
const User = require("../models/user.model")
const security = require("../middleware/security")

router.get('/me', security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { email } = res.locals.user;
        const user = await userController.fetchUserByEmail(email);
        const publicUser = User.build({ username: user.username, email: user.email, firstName: user.firstName, lastName: user.lastName });
        return res.status(200).json({ user: publicUser });
    } catch(err) {
        next(err);
    }
})

router.get("/getAllUsers", async (req, res, next) => {
    try {
        const allUsers = await userController.getAllUsers() 
        return res.status(200).send(allUsers)
    } catch (err) {
        next(err)
    } 
})

// Login Endpoint
router.post("/login", async (req, res, next) => {
    try {
        const response = await userController.login(req.body)
        if (!response) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = tokens.createUserJwt(response);
        res.status(200).json({ user: response, token })

    } catch (err) {
        next(err)
    }    
})

// Register Endpoint 
router.post("/register", async (req, res, next) => {
    try {
        const response = await userController.register(req.body)
        const token = tokens.createUserJwt(response)
        res.status(200).json({ user: response, token })
    
    } catch (err) {
        next(err)
    }
})

router.get("/getTwoItemsDiffCategorySameDay/:category1/:category2", async (req, res, next) => {
    try {
        const category1 = req.params.category1
        const category2 = req.params.category2
        const response = await userController.getTwoItemsDiffCategorySameDay(category1, category2)
        res.status(200).send(response)
    }
    catch(err) {
        next(err)
    }
})

router.get('/getExcellentGoodItemsForUser/:username', async (req, res, next) => {
    try {
        const username = req.params.username
        const response = await userController.getExcellentGoodItemsForUser(username)
        res.status(200).send(response)
    }
    catch (err) {
        next(err)
    }
})

router.get('/getPopularUsers', async (req, res, next) => {
    try {
        const users = await userController.getPopularUsers()
        res.status(200).send(users)
    } catch(err) {
        next(err)
    }
})

router.get("/getNotExcellentUsers", async (req, res, next) => {
    try {
        const users = await userController.getNotExcellentUsers()
        res.status(200).send(users)
    } catch(err) {
        next(err)
    }
})

router.get("/getNiceReviewers", async (req, res, next) => {
    try {
        const users = await userController.getNiceReviewers()
        res.status(200).send(users)
    } catch(err) {
        next(err)
    }
})

router.get("/getMeanReviewers", async (req, res, next) => {
    try {
        const users = await userController.getMeanReviewers()
        res.status(200).send(users)
    } catch(err) {
        next(err)
    }
})

router.get("/getGoodProducers", async (req, res, next) => {
    try {
        const users = await userController.getGoodProducers()
        res.status(200).send(users)
    } catch(err) {
        next(err)
    }
})

router.get("/getFriendUsers", async (req, res, next) => {
    try {
        const users = await userController.getFriendUsers()
        res.status(200).send(users)
    } catch (err) {
        next(err)
    }
})

router.post("/getSameFriends", async (req, res, next) => {
    try {
        const {user1, user2} = req.body
        console.log("BODY: ", req.body)
        const users = await userController.getSameFriends(user1, user2)
        res.status(200).send(users)
    } catch(err) {
        next(err)
    }
})

module.exports = router