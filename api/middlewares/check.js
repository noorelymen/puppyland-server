const User = require("../models/User");
const createError = require("../utils/error");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res, next) => {
  if (req.cookies.accessToken) {
    const token = req.cookies.accessToken;
    // const token = req.headers.authorization;
    if (!token) {
      return next(createError(401, "You are not authenticated."));
    }

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      const result = await User.findOne({ username: decoded.username });
      if (!result) {
        return next(createError(401, "You are not allowed"));
      } else {
        req.user = result;
        return next();
      }
    } catch (error) {
      return next(createError(403, "Invalid token"));
    }
  } else {
    return next(createError(401, "No token provided"));
  }
};

exports.role = async (req, res, next) => {
  try {
    await exports.login(req, res, () => {}); // Call login middleware to check if user is authenticated
    if (req.user.role !== "admin") {
      return next(createError(403, "You are not allowed!"));
    } else {
      return next();
    }
  } catch (error) {
    return next(createError(401, "You are not logged in"));
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
