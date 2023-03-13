const User = require("../models/user.model")
const db = require("../db")

const login = async (req, res) => {
    // const { email, password } = req.body

    // const user = await User.findOne({ email });
    // if (email !== user?.email) return false;
        
    // if (password !== user?.password) return false;

    // return user 
}

const register = async (req, res) => {
    // try {
    //     const { firstName, lastName, email, password } = req.body

    //     const user = new User({
    //         firstName,
    //         lastName,
    //         email,
    //         password
    //     })

    //     try {
    //         return await user.save()
    //     } catch (error) {
    //         res.status(500).json({ success: false, error: error.message });
    //     }

    // } catch (error) {
    //     res.status(400).json({ success: false, error: error.message });
    // }
}

module.exports = {
    login,
    register
}