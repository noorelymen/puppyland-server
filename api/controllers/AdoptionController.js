const Adoption = require("../models/Adoption");
const Puppy = require("../models/Puppy");

exports.createAdoptionRequest = async (req, res) => {
  try {
    const { puppyId, userId } = req.body;

    // Check if the user has already submitted an adoption request for this puppy
    const existingRequest = await Adoption.findOne({
      puppy: puppyId,
      user: userId,
    });
    if (existingRequest) {
      return res
        .status(400)
        .json({
          error:
            "You have already submitted an adoption request for this puppy.",
        });
    }

    // Create a new adoption request
    const adoption = new Adoption({
      puppy: puppyId,
      user: userId,
      status: "Pending",
    });
    await adoption.save();

    res.json(adoption);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getAdoptionRequests = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all adoption requests for the specified user
    const adoptionRequests = await Adoption.find({ user: userId }).populate(
      "puppy"
    );

    res.json(adoptionRequests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.approveAdoptionRequest = async (req, res) => {
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

exports.rejectAdoptionRequest = async (req, res) => {
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
