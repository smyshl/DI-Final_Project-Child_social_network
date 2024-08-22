const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


async function registerUser(req, res) {

    const { password, email } = req.body;
    const userInfo = { password, email };

    if (!email) {
        return res.status(200).json({ message: "Email can't be empty" });        
    }

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
};


async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const user = await userModel.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: `User with email '${email}' not found`})
        }

        const passwordMatch = await bcrypt.compare(password + '', user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Authentication failed. Wrong password" })
        }

        /** create the token */
        const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

        const accessToken = jwt.sign(
            { userid: user.id, email: user.email },
            ACCESS_TOKEN_SECRET,
            { expiresIn: "60s" }
        );

        const refreshToken = jwt.sign(
            { userid: user.id, email: user.email },
            REFRESH_TOKEN_SECRET,
            { expiresIn: "3d" }
        );

        // set token in httpOnly
        res.cookie("token", accessToken, {
            httpOnly: true,
            // secure:
            maxAge: 60 * 1000,
        });

        res.cookie("refresh", refreshToken, {
            httpOnly: true,
            // secure:
            maxAge: 60 * 60 * 1000 * 24 * 3,
        });

        res.status(201).json({
            message: "Login succesfully",
            user: { userid: user.id, email: user.email, role: user.role },
            token: accessToken,
            refresh: refreshToken,
          });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error. Something goes wrong" });   
    }
};


module.exports = {

    registerUser,
    loginUser,

}