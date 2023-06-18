const express = require("express");
const router = express.Router();

const MessageController = require("../controllers/MessageController");
const { login, role } = require("../middlewares/check");

module.exports = () => {
  //CREATE MESSAGE
  router.post("/", login, MessageController.createMessage);

  //GET ALL MESSAGES
  router.get("/:id", login, MessageController.getMessages);
  return router;
};
