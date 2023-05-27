const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
    isOwner: {
      type: Boolean,
      default: false,
    },
    memberSince: {
      type: String,
      required: false,
    },
    rescuedPuppies: {
      type: Number,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
    role: {
      type: String,
      default: "user",
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
