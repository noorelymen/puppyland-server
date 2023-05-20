const express = require("express");
const router = express.Router();
const puppiesRoutes = require("./puppies");
const usersRoutes = require("./users");
const breedRoutes = require("./breed");
const authRoutes = require("./auth");

module.exports = () => {
  router.use("/puppies", puppiesRoutes());
  router.use("/users", usersRoutes());
  router.use("/breed", breedRoutes());
  router.use("/auth", authRoutes());
  return router;
};
