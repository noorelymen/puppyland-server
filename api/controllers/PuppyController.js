const Puppy = require("../models/Puppy");
const createError = require("../utils/error");
const moment = require("moment");

//CREATE A NEW PUPPY
exports.addNewPuppy = async (req, res, next) => {
  //create a new Puppy
  if (!req.user.isRescuer)
    return next(createError(403, `Only rescuers can add new pets.`));

  const newPuppy = new Puppy({
    userId: req.user._id.toString(),
    ...req.body,
  });

  try {
    const savedPuppy = await newPuppy.save();
    res.status(201).json(savedPuppy);
  } catch (err) {
    next(err);
  }
};

//UPDATE AN EXISTING PUPPY
exports.updatePuppy = async (req, res, next) => {
  try {
    const puppy = await Puppy.findById(req.params.id);
    if (!puppy) return next(createError(404, "Puppy not found!"));

    if (puppy.userId !== req.user._id.toString())
      return next(createError(403, "You can update your puppies only!"));

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
    //check if user is rescuer
    const puppy = await Puppy.findById(req.params.id);
    if (!puppy) return next(createError(404, "Puppy not found!"));

    if (puppy.userId !== req.user._id.toString())
      return next(createError(403, "You can delete your puppies only!"));

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
    if (!puppy) return next(createError(404, "Puppy not found!"));

    res.status(200).json({
      msg: "Puppy fetched successfully.",
      puppy,
    });
  } catch (err) {
    next(err);
  }
};

// GET ALL PUPPIES
exports.getAllPuppies = async (req, res, next) => {
  const { breed: urlBreed } = req.query; // Get the breed from the URL parameter
  const { breed: filterBreed, ...filters } = req.query; // Get the breed from the filter and other filters
  const finalBreed = urlBreed || filterBreed; // Use the breed from the URL if it exists, otherwise use the breed from the filter

  const formattedBreed = finalBreed
    ? finalBreed.replace(/-/g, " ")
    : finalBreed; // Convert breed parameter from hyphen-separated to space-separated

  const queryFilters = {
    ...(formattedBreed && { breed: formattedBreed }), // Include the formatted breed in the filters if it exists
    ...filters,
  };

  const sortOptions = {
    latest: { createdAt: -1 },
    available: { isAvailable: -1 },
  };

  try {
    let puppies;

    if (formattedBreed) {
      puppies = await Puppy.find(queryFilters).sort(
        sortOptions[req.query.sort]
      );
    } else {
      puppies = await Puppy.find(queryFilters).sort(
        sortOptions[req.query.sort]
      );
    }

    if (!puppies || puppies.length === 0)
      return next(createError(404, "No puppies found!"));

    res.status(200).json({
      msg: "Puppies fetched successfully",
      puppies,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
