const express = require("express");
const router = express.Router();

const MessageController = require("../controllers/MessageController");
const { login, role } = require("../middlewares/check");

module.exports = () => {
  return router;
};
