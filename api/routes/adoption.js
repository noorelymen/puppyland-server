const express = require("express");
const router = express.Router();

const AdoptionController = require("../controllers/AdoptionController");
const { login, role } = require("../middlewares/check");

module.exports = () => {
  return router;
};
