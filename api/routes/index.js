const express = require("express");
const router = express.Router();
const adoptionRoutes = require("./adoption");
const authRoutes = require("./auth");
const breedRoutes = require("./breed");
const conversationRoutes = require("./conversation");
const messageRoutes = require("./message");
const orderRoutes = require("./order");
const puppiesRoutes = require("./puppies");
const reviewRoutes = require("./review");
const usersRoutes = require("./users");

module.exports = () => {
  router.use("/adoption", adoptionRoutes());
  router.use("/auth", authRoutes());
  router.use("/breed", breedRoutes());
  router.use("/conversations", conversationRoutes());
  router.use("/messages", messageRoutes());
  router.use("/orders", orderRoutes());
  router.use("/puppies", puppiesRoutes());
  router.use("/review", reviewRoutes());
  router.use("/users", usersRoutes());
  return router;
};
