const mongoose = require("mongoose");

const PuppySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 0,
    max: 50,
  },
  birthday: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  gallery: {
    type: [String],
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  qualities: {
    type: [String],
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

//export default mongoose.model("Puppy", PuppySchema);
const Puppy = mongoose.model("Puppy", PuppySchema);
module.exports = Puppy;
