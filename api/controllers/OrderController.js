const Order = require("../models/Order");

//UPDATE AN EXISTING Order
exports.updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //because the find and update by id method is gonna return the unchanged object and we need it to return the object after the put method
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    next(err);
  }
};

//DELETE AN EXISTING Order
exports.deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order deleted.");
  } catch (err) {
    next(err);
  }
};

//GET AN EXISITNG Order
exports.getOrderById = async (req, res, next) => {
  try {
    const Order = await Order.findById(req.params.id);
    res.status(200).json(Order);
  } catch (err) {
    next(err);
  }
};

//GET ALL OrderS
exports.getAllOrders = async (req, res, next) => {
  try {
    const Orders = await Order.find();
    res.status(200).json({
      msg: "Orders get with success",
      Orders,
    });
  } catch (err) {
    res.status(500).send(err.Order);
  }
};
