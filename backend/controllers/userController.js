const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


async function registerUser(req, res) {

    const { password, email } = req.body;
    const userInfo = { password, email };

    try {

        const newUserInfo = await userModel.createUser(userInfo);
        res.status(201).json({
            message: "User registered successfully",
            user: newUserInfo,
        });
        
    } catch (error) {
        console.log(error);
        if (error.code == 23505) {
            return res.status(200).json({ message: "Email already exist" });
        }
        res.status(500).json({ message: "internal server error" });        
    }


}


module.exports = {

    registerUser,

}