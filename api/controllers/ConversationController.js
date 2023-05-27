const Conversation = require("../models/Conversation");

//UPDATE AN EXISTING Conversation
exports.updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //because the find and update by id method is gonna return the unchanged object and we need it to return the object after the put method
    );
    res.status(200).json(updatedConversation);
  } catch (err) {
    next(err);
  }
};

//DELETE AN EXISTING Conversation
exports.deleteConversation = async (req, res, next) => {
  try {
    await Conversation.findByIdAndDelete(req.params.id);
    res.status(200).json("Conversation deleted.");
  } catch (err) {
    next(err);
  }
};

//GET AN EXISITNG Conversation
exports.getConversationById = async (req, res, next) => {
  try {
    const Conversation = await Conversation.findById(req.params.id);
    res.status(200).json(Conversation);
  } catch (err) {
    next(err);
  }
};

//GET ALL ConversationS
exports.getAllConversations = async (req, res, next) => {
  try {
    const Conversations = await Conversation.find();
    res.status(200).json({
      msg: "Conversations get with success",
      Conversations,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
