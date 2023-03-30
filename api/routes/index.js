const express = require("express");
const router = express.Router();
const petsRoutes = require("./pets");
const usersRoutes = require("./users");
const petCategoryRoutes = require("./petcategory");
const authRoutes = require("./auth");

module.exports = () => {
  router.use("/pets", petsRoutes());
  router.use("/users", usersRoutes());
  router.use("/category", petCategoryRoutes());
  router.use("/auth", authRoutes());
  return router;
};
