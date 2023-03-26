const User = require("../models/User");

//GET ALL USERS
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      msg: "Users get with success",
      users,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//GET AN EXISITNG USER
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
