const User = require("../models/User");
const createError = require("../utils/error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER CONTROLLER
exports.register = async (req, res, next) => {
  try {
    // Get user info from req.body
    const {
      firstname,
      lastname,
      username,
      email,
      password,
      phone,
      img,
      city,
      desc,
      isOwner,
      memberSince,
      rescuedPuppies,
      rating,
      role,
    } = req.body;

    // Validations
    if (!(email && password && firstname && lastname && username && phone)) {
      return next(createError(400, "All register fields are required"));
    }

    // Verify if it is an existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(createError(409, "User already exist please sign in."));
    }

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Generate token
    const token = jwt.sign({ email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    // Save the user
    const newUser = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: encryptedPassword,
      phone,
      img,
      city,
      desc,
      isOwner,
      memberSince,
      rescuedPuppies,
      rating,
      role,
      token,
    });

    // Send response
    res.status(201).json({
      msg: "User created successfully",
      user: {
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        img: newUser.img,
        city: newUser.city,
        desc: newUser.desc,
        isOwner: newUser.isOwner,
        memberSince: newUser.memberSince,
        rescuedPuppies: newUser.rescuedPuppies,
        rating: newUser.rating,
        role: newUser.role,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
        token: newUser.token,
      },
    });
  } catch (err) {
    next(err);
  }
};

// LOGIN CONTROLLER
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Validations
    if (!(username && password)) {
      return next(createError(400, "Username and password Required!"));
    }

    // Verify if user exits in database
    const user = await User.findOne({ username });
    if (!user) return next(createError(404, "User not found!"));

    // Compare entered and registered passwords
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate token
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          isOwner: user.isOwner,
          isAdopter: user.isAdopter,
        },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );

      user.token = token;

      res
        .cookie("accessToken", token, {
          httpOnly: true, //we can only change the token using http requests
        })
        .status(200)
        .json({
          msg: "User logged in successfully",
          token: user.token,
          id: user._id,
          firstname: user.firstname,
          img: user.img,
        });
    } else {
      return next(createError(401, "Wrong username or password!"));
    }
  } catch (err) {
    next(err);
  }
};

// LOGOUT

exports.logout = async (req, res, next) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};

// LAMA DEV
// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import { createError } from "../utils/error.js";
// import jwt from "jsonwebtoken";

// export const register = async (req, res, next) => {
//   try {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(req.body.password, salt);

//     const newUser = new User({
//       ...req.body,
//       password: hash,
//     });

//     await newUser.save();
//     res.status(201).send("User has been created.");
//   } catch (err) {
//     res.status(500).send("Something went wrong");
//     next(createError(,""));
//   }
// };
// export const login = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     if (!user) return next(createError(404, "User not found!"));

//     const isPasswordCorrect = await bcrypt.compareSync(
//       req.body.password,
//       user.password
//     );
//     if (!isPasswordCorrect)
//       return next(createError(400, "Wrong password or username!"));

//     const token = jwt.sign(
//       { id: user._id, isOwner: user.isOwner },
//       process.env.JWT
//     );

//     const { password, isOwner, ...otherDetails } = user._doc;
//     res
//       .cookie("accessToken", token, {
//         httpOnly: true,
//       })
//       .status(200)
//       .json({ details: { ...otherDetails }, isOwner });
//   } catch (err) {
//     next(createError(,""));
//   }
// };
