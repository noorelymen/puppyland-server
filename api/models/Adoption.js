const mongoose = require("mongoose");

const AdoptionSchema = new mongoose.Schema({
  rescuerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  adopterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  puppyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Puppy",
    required: true,
  },
  photo: {
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

AdoptionSchema.index(
  { rescuerId: 1, adopterId: 1, puppyId: 1 },
  { unique: true }
);

const Adoption = mongoose.model("Adoption", AdoptionSchema);
module.exports = Adoption;
