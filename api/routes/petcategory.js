const express = require("express");
const router = express.Router();
const PetCategoryController = require("../controllers/PetCategoryController");

module.exports = () => {
  router.get("/", PetCategoryController.getPetsInCategory);
  return router;
};
