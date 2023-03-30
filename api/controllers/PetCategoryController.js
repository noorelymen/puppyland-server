const Pet = require("../models/Pet");

//GET ALL PETS
exports.getDogs = async (req, res, next) => {
  try {
    const dogs = await Pet.find({ category: "Dogs" });
    res.status(200).json(dogs);
  } catch (err) {
    next(err);
  }
};

//GET DOGS
exports.getDogs = async (req, res, next) => {
  try {
    const dogs = await Pet.find({ category: "Dogs" });
    res.status(200).json(dogs);
  } catch (err) {
    next(err);
  }
};

//GET CATS
exports.getCats = async (req, res, next) => {
  try {
    const cats = await Pet.find({ category: "Cats" });
    res.status(200).json(cats);
  } catch (err) {
    next(err);
  }
};

//GET BIRDS
exports.getBirds = async (req, res, next) => {
  try {
    const birds = await Pet.find({ category: "Birds" });
    res.status(200).json(birds);
  } catch (err) {
    next(err);
  }
};

//GET OTHER
exports.getOther = async (req, res, next) => {
  try {
    const other = await Pet.find({ category: "Other" });
    res.status(200).json(other);
  } catch (err) {
    next(err);
  }
};
