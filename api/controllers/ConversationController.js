const Conversation = require("../models/Conversation");
const User = require("../models/User");
const createError = require("../utils/error");
//CREATE A NEW CONVERSATION
exports.createConversation = async (req, res, next) => {
  //create a new conversation

  const newConversation = new Conversation({
    id: req.user.isRescuer
      ? req.user._id.toString() + req.body.to
      : req.body.to + req.user._id.toString(),
    rescuerId: req.user.isRescuer ? req.user._id.toString() : req.body.to,
    adopterId: req.user.isRescuer ? req.body.to : req.user._id.toString(),
    readByRescuer: req.user.isRescuer,
    readByAdopter: !req.user.isRescuer,
    // ...(req.user.isRescuer ? { readByRescuer: true } : { readByAdopter: true }),
  });

  console.log("New Conversation", newConversation);

  try {
    const savedConversation = await newConversation.save();
    res.status(201).json(savedConversation);
  } catch (err) {
    next(err);
  }
};

//UPDATE A CONVERSATION
exports.updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      {
        id: req.params.id,
      },
      {
        $set: {
          // readByRescuer: req.user.isRescuer,
          // readByAdopter: !req.user.isRescuer,

          ...(req.user.isRescuer
            ? { readByRescuer: true }
            : { readByAdopter: true }),
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatedConversation);
  } catch (err) {
    next(err);
  }
};

//GET A CONVERSATION
exports.getConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      id: req.params.id,
    });
    console.log(conversation);
    if (!conversation) return next(createError(404, "Not found!"));
    res.status(200).json(conversation);
  } catch (err) {
    next(err);
  }
};

//GET ALL CONVERSATIONS
exports.getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.user.isRescuer
        ? { rescuerId: req.user._id.toString() }
        : { adopterId: req.user._id.toString() }
    ).sort({ updatedAt: -1 });

    res.status(200).json(conversations);
  } catch (err) {
    next(err);
  }
};

//DELETE A CONVERSATION
exports.deleteConversation = async (req, res, next) => {
  try {
    await Conversation.findByIdAndDelete(req.params.id);
    res.status(200).json("Conversation deleted.");
  } catch (err) {
    next(err);
  }
};
