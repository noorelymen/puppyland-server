const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/OrderController");
const { login, role } = require("../middlewares/check");

module.exports = () => {
  return router;
};
