const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

//CREATE MESSAGE
exports.createMessage = async (req, res, next) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.user._id.toString(),
    message: req.body.message,
  });

  try {
    const savedMessage = await newMessage.save();
    await Conversation.findOneAndUpdate(
      { _id: req.body.conversationId },
      {
        $set: {
          readbyRescuer: req.user.isRescuer,
          readByAdopter: !req.user.isRescuer,
          lastMessage: req.body.message,
        },
      },
      {
        new: true,
      }
    );

    console.log("SAVED MESSAGE");
    console.log(savedMessage);
    res.status(201).send(savedMessage);
  } catch (err) {
    next(err);
  }
};

//GET ALL MESSAGES
exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    res.status(200).json({ messages });
  } catch (err) {
    next(err);
  }
};
