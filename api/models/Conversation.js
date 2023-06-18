const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    rescuerId: {
      type: String,
      required: true,
    },
    adopterId: {
      type: String,
      required: true,
    },
    readByRescuer: {
      type: Boolean,
      required: true,
    },
    readByAdopter: {
      type: Boolean,
      required: true,
    },
    lastMessage: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", ConversationSchema);
module.exports = Conversation;
