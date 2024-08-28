const jwt = require("jsonwebtoken");
require("dotenv").config();

const { ACCESS_TOKEN_SECRET } = process.env;

const verifyToken = (req, res, next) => {
  const accessToken = req.headers["x-access-token"];

//   console.log("verifyToken middleware, accessToken =>", accessToken);

  if (!accessToken) return res.status(401).json({ message: "User unauthorized" });

  jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err)
      return res.status(403).json({ message: "Access denied. Access token expired", error: err.message });

    const { userid, email } = decode;
    req.userid = userid;
    req.email = email;
    // req.userinfo = decode

    // console.log(req);

    next();
  });
};

module.exports = {
  verifyToken,
};