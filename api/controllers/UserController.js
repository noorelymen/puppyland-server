const User = require("../models/User");

//UPDATE AN EXISTING USER
exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //because the find and update by id method is gonna return the unchanged object and we need it to return the object after the put method
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

//DELETE AN EXISTING User
exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted.");
  } catch (err) {
    next(err);
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

//GET ALL USERS
exports.getAllUsers = async (req, res, next) => {
  console.warn("Hey");
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
