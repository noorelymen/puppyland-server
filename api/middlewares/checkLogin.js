const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkLogin = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    console.log(token);
    const decoded = jwt.decode(token, process.env.TOKEN_KEY);
    if (!decoded) {
      return res.status(401).send("Ivalid token");
    }
    console.log(decoded);
    const result = await User.findOne({ email: decoded.email });
    if (!result) {
      return res.status(401).json({ access: "Not allowed" });
    } else {
      return next();
    }
  } else {
    return res.status(401).send("No token provided");
  }
};

module.exports = checkLogin;
