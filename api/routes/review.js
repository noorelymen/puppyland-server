const express = require("express");
const router = express.Router();

const ReviewController = require("../controllers/ReviewController");
const { login, role } = require("../middlewares/check");

module.exports = () => {
  return router;
};
