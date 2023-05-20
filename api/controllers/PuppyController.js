const Puppy = require("../models/Puppy");

//CREATE A NEW PUPPY
exports.addNewPuppy = async (req, res, next) => {
  //create a new Puppy
  const newPuppy = new Puppy(req.body);
  try {
    const savedPuppy = await newPuppy.save();
    res.status(200).json(savedPuppy);
  } catch (err) {
    next(err);
  }
};

//UPDATE AN EXISTING PUPPY
exports.updatePuppy = async (req, res, next) => {
  try {
    const updatedPuppy = await Puppy.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //because the find and update by id method is gonna return the unchanged object and we need it to return the object after the put method
    );
    res.status(200).json(updatedPuppy);
  } catch (err) {
    next(err);
  }
};

//DELETE AN EXISTING PUPPY
exports.deletePuppy = async (req, res, next) => {
  try {
    await Puppy.findByIdAndDelete(req.params.id);
    res.status(200).json("Puppy deleted.");
  } catch (err) {
    next(err);
  }
};

//GET AN EXISITNG PUPPY
exports.getPuppyById = async (req, res, next) => {
  try {
    const puppy = await Puppy.findById(req.params.id);
    res.status(200).json({
      msg: "Puppy fetched successfully.",
      puppy,
    });
  } catch (err) {
    next(err);
  }
};

//GET ALL PUPPIES
exports.getAllPuppies = async (req, res, next) => {
  try {
    const puppies = await Puppy.find();
    res.status(200).json({
      msg: "Puppies fetched successfully",
      puppies,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
