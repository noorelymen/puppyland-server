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
      isRescuer,
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
      isRescuer,
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
        isRescuer: newUser.isRescuer,
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
          isRescuer: user.isRescuer,
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
          isRescuer: user.isRescuer,
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
