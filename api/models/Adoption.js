const mongoose = require("mongoose");

const AdoptionSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  adopterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  puppyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Puppy",
    required: true,
    unique: true,
  },
  img: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

const Adoption = mongoose.model("Adoption", AdoptionSchema);
module.exports = Adoption;
