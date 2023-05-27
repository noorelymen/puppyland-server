const Message = require("../models/Message");

//UPDATE AN EXISTING Message
exports.updateMessage = async (req, res, next) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //because the find and update by id method is gonna return the unchanged object and we need it to return the object after the put method
    );
    res.status(200).json(updatedMessage);
  } catch (err) {
    next(err);
  }
};

//DELETE AN EXISTING Message
exports.deleteMessage = async (req, res, next) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json("Message deleted.");
  } catch (err) {
    next(err);
  }
};

//GET AN EXISITNG Message
exports.getMessageById = async (req, res, next) => {
  try {
    const Message = await Message.findById(req.params.id);
    res.status(200).json(Message);
  } catch (err) {
    next(err);
  }
};

//GET ALL MessageS
exports.getAllMessages = async (req, res, next) => {
  try {
    const Messages = await Message.find();
    res.status(200).json({
      msg: "Messages get with success",
      Messages,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
