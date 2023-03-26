const Pet = require("../models/Pet");

//CREATE A NEW PET
exports.addNewPet = async (req, res, next) => {
  //create a new pet
  const newPet = new Pet(req.body);
  try {
    const savedPet = await newPet.save();
    res.status(200).json(savedPet);
  } catch (err) {
    next(err);
  }
};

//UPDATE AN EXISTING PET
exports.updatePet = async (req, res, next) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //because the find and update by id method is gonna return the unchanged object and we need it to return the object after the put method
    );
    res.status(200).json(updatedPet);
  } catch (err) {
    next(err);
  }
};

//DELETE AN EXISTING PET
exports.deletePet = async (req, res, next) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.status(200).json("Pet deleted.");
  } catch (err) {
    next(err);
  }
};

//GET AN EXISITNG PET
exports.getPetById = async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id);
    res.status(200).json({
      msg: "Pet fetched successfully.",
      pet,
    });
  } catch (err) {
    next(err);
  }
};

//GET ALL PETS
exports.getAllPets = async (req, res, next) => {
  try {
    const pets = await Pet.find();
    res.status(200).json({
      msg: "Pets fetched successfully",
      pets,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
