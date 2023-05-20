const mongoose = require("mongoose");

const AdoptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  puppy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Puppy",
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

const Adoption = mongoose.model("Adoption", AdoptionSchema);
module.exports = Adoption;
