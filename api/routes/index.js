const express = require("express");
const router = express.Router();
const petsRoutes = require("./pets");
const petCategoryRoutes = require("./petcategory");
const authRoutes = require("./auth");

module.exports = () => {
  router.use("/pets", petsRoutes());
  router.use("/category", petCategoryRoutes());
  router.use("/auth", authRoutes());
  return router;
};
