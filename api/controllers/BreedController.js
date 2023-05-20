const Puppy = require("../models/Puppy");

//GET GERMAN SHEPHERDS
exports.getGermanShepherds = async (req, res, next) => {
  try {
    const germanShepherds = await Puppy.find({ category: "German Shepherd" });
    res.status(200).json(germanShepherds);
  } catch (err) {
    next(err);
  }
};

//GET ROTWEILERS
exports.getRotweilers = async (req, res, next) => {
  try {
    const rotweilers = await Puppy.find({ category: "Rotweiler" });
    res.status(200).json(rotweilers);
  } catch (err) {
    next(err);
  }
};

//GET GOLDEN RETRIEVERS
exports.getGoldenRetrievers = async (req, res, next) => {
  try {
    const goldenRetrievers = await Puppy.find({ category: "Golden Retriever" });
    res.status(200).json(goldenRetrievers);
  } catch (err) {
    next(err);
  }
};

//GET HUSKIES
exports.getHuskies = async (req, res, next) => {
  try {
    const huskies = await Puppy.find({ category: "Husky" });
    res.status(200).json(huskies);
  } catch (err) {
    next(err);
  }
};

//GET OTHER
exports.getOther = async (req, res, next) => {
  try {
    const other = await Puppy.find({ category: "Other" });
    res.status(200).json(other);
  } catch (err) {
    next(err);
  }
};
