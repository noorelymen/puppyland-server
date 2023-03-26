const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER CONTROLLER
exports.register = async (req, res) => {
  try {
    // get user info from req.body
    const { firstname, lastname, username, email, password } = req.body;

    // validations
    if (!(email && password && firstname && lastname && username)) {
      return res.status(400).send("All register fields are required");
    }

    //verify if it is an old user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).send("User already exist please sign in.");
    }

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Generate token
    const token = jwt.sign({ email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    // save our user
    const savedUser = await User.create({
      email,
      password: encryptedPassword,
      firstname,
      lastname,
      username,
      token,
    });

    // send response
    res.status(201).json({
      msg: "User created successfully",
      user: {
        email: savedUser.email,
        firstname: savedUser.firstname,
        lastname: savedUser.lastname,
        username: savedUser.username,
        role: savedUser.role,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt,
        token: savedUser.token,
      },
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// LOGIN CONTROLLER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!(email && password)) {
      return res.status(400).send("All fields are required");
    }

    // VALIDATE if user exits in database
    const user = await User.findOne({ email });

    //COMPARE TYPED AND REGISTERED   PASSWORDS
    if (user && (await bcrypt.compare(password, user.password))) {
      // generate token

      const token = jwt.sign({ email: user.email }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
      });

      user.token = token;

      res.status(200).json({
        msg: "User logged in successfully",
        token: user.token,
      });
    } else {
      return res.status(401).send("Incorrect email or password");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
