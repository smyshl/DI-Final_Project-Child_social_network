const usersModel = require('../models/usersModel.js');
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
        const newUserInfo = await usersModel.createUser(userInfo);
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
        const user = await usersModel.getUserByEmail(email);
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
            { user_id: user.id, first_name: user.first_name, role: user.role },
            ACCESS_TOKEN_SECRET,
            { expiresIn: "60s" }
        );

        const refreshToken = jwt.sign(
            { user_id: user.id, first_name: user.first_name, role: user.role },
            REFRESH_TOKEN_SECRET,
            { expiresIn: "1h" }
        );

        // set token in header
        res.set('x-access-token', accessToken);

        res.cookie("refresh", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 60 * 60 * 1000,
        });

        // console.log("usersController loginUser res =>", res);
        

        res.status(201).json({
            message: "Login succesfully",
            user: { userid: user.id, email: user.email, role: user.role, first_name: user.first_name },
            refresh: refreshToken,
          });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error. Something goes wrong" });   
    }
};


async function getNewAccessToken(req, res) {

    const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

    // console.log("usersController, getNewAccessToken, request =>", req);
    
    try {
      if (!req.cookies || !req.cookies.refresh)
        return res.status(401).json({ message: "No refresh token found" });

    const refreshToken = req.cookies.refresh;      

      jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decode) => {
        if (err)
          return res
            .status(403)
            .json({ message: "Access denied. Refresh token expired. Please log in again", error: err.message });

        const { user_id, first_name, role } = decode

        const accessToken = jwt.sign(
          { user_id, first_name, role },
          ACCESS_TOKEN_SECRET,
          { expiresIn: "60s" }
        );

        res.set("x-access-token", accessToken);

        res.status(201).json({
          message: "New access token succesfully created",
          user: { user_id, first_name, role }
        });
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "internal server error. Something goes wrong" });
    }
};


async function delRefreshToken(req, res) {

  try {

    const refreshToken = 'buy-buy';

    res.set("x-access-token", "buy-buy");    

    res.cookie("refresh", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 60 * 1000,
    });

    res.status(201).json({
      message: "Logout tokens successfully sended",
    });

    // console.log("usersController, delRefreshToken, res =>", res);
    

  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "internal server error. Something goes wrong" });
  }
}


module.exports = {

    registerUser,
    loginUser,
    getNewAccessToken,
    delRefreshToken,

};