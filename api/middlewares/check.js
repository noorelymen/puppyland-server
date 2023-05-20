const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send("You are not authenticated");
    }

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      const result = await User.findOne({ email: decoded.email });
      if (!result) {
        return res.status(401).json({ access: "Not allowed" });
      } else {
        req.user = result;
        return next();
      }
    } catch (error) {
      return res.status(403).send("Invalid token");
    }
  } else {
    return res.status(401).send("No token provided");
  }
};

exports.role = async (req, res, next) => {
  try {
    await exports.login(req, res, () => {}); // Call login middleware to check if user is authenticated
    if (req.user.role !== "admin") {
      return res.status(403).send("You are not an admin!");
    } else {
      return next();
    }
  } catch (error) {
    return res.status(401).send("You are not logged in");
  }
};

// LAMA DEV

// import jwt from "jsonwebtoken";
// import { createError } from "../utils/error.js";

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) {
//     return next(createError(401, "You are not authenticated!"));
//   }

//   jwt.verify(token, process.env.JWT, (err, user) => {
//     if (err) return next(createError(403, "Token is not valid!"));
//     req.user = user;
//     next();
//   });
// };

// export const verifyUser = (req, res, next) => {
//   verifyToken(req, res, next, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       next();
//     } else {
//       return next(createError(403, "You are not authorized!"));
//     }
//   });
// };

// export const verifyAdmin = (req, res, next) => {
//   verifyToken(req, res, next, () => {
//     if (req.user.isAdmin) {
//       next();
//     } else {
//       return next(createError(403, "You are not authorized!"));
//     }
//   });
// };
