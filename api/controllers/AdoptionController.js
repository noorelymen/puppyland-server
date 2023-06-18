const Adoption = require("../models/Adoption");
const Puppy = require("../models/Puppy");
const User = require("../models/User");
const createError = require("../utils/error");

exports.createAdoption = async (req, res, next) => {
  try {
    //fetch owner data from puppy
    const puppy = await Puppy.findById(req.params.puppyId);

    // Check if the user has already submitted an adoption request for this puppy
    const existingRequest = await Adoption.findOne({
      puppyId: puppy.puppyId,
      adopterId: puppy.adopterId,
    });
    if (existingRequest) {
      return res.status(400).json({
        error: "You have already submitted an adoption request for this puppy.",
      });
    }

    // Create a new adoption request
    const adoption = new Adoption({
      puppyId: puppy._id.toString(),
      adopterId: req.user._id.toString(),
      rescuerId: puppy.rescuerId,
      photo: puppy.photo,
      name: puppy.name,
      breed: puppy.breed,
      status: "Pending",
    });
    await adoption.save();
    res.status(200).json(adoption);
  } catch (err) {
    next(err);
  }
};

exports.getAdoptions = async (req, res, next) => {
  console.log(req.user);
  try {
    // Find all adoption requests for the specified user
    const adoptions = await Adoption.find({
      ...(req.user.isRescuer
        ? { rescuerId: req.user._id }
        : { adopterId: req.user._id }),
    });

    const owner = await User.findById(req.user._id);

    res.status(200).json({ adoptions: adoptions, owner: owner });
  } catch (err) {
    next(err);
  }
};

exports.approveAdoption = async (req, res) => {
  try {
    const { adoptionId } = req.params;

    // Find the adoption request by ID
    const adoption = await Adoption.findById(adoptionId).populate("puppy");

    // Update the adoption request status to "Approved"
    adoption.status = "Approved";
    await adoption.save();

    // Update the puppy's available field to false
    await Puppy.findByIdAndUpdate(adoption.puppy._id, { available: false });

    res.json(adoption);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.rejectAdoption = async (req, res) => {
  try {
    const { adoptionId } = req.params;

    // Find the adoption request by ID
    const adoption = await Adoption.findById(adoptionId);

    // Update the adoption request status to "Rejected"
    adoption.status = "Rejected";
    await adoption.save();

    res.json(adoption);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.cancelAdoption = async (req, res) => {
  try {
    const { adoptionId } = req.params;

    // Find the adoption request by ID
    const adoption = await Adoption.findById(adoptionId);

    // Update the adoption request status to "Rejected"
    adoption.status = "Cancelled";
    await adoption.save();

    res.json(adoption);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.deleteAdoption = async (req, res) => {
  try {
    const { adoptionId } = req.params;

    // Find the adoption request by ID
    const adoption = await Adoption.findByIdAndDelete(adoptionId);

    // Update the adoption request status to "Rejected"
    adoption.status = "Cancelled";
    await adoption.save();

    res.json(adoption);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
