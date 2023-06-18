const express = require("express");
const router = express.Router();

const ConversationController = require("../controllers/ConversationController");
const { login, role } = require("../middlewares/check");

module.exports = () => {
  //CREATE CONVERSATION
  router.post("/", login, ConversationController.createConversation);

  //UPDATE CONVERSATION
  router.put("/:id", login, ConversationController.updateConversation);

  //GET CONVERSATION
  router.get(
    "/conversation/:id",
    login,
    ConversationController.getConversation
  );

  //GET ALL CONVERSATIONS
  router.get("/", login, ConversationController.getConversations);

  return router;
};
