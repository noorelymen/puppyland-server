const express = require("express");
const router = express.Router();

const ConversationController = require("../controllers/ConversationController");
const { login, role } = require("../middlewares/check");

module.exports = () => {
  return router;
};
