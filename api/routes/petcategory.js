const express = require("express");
const router = express.Router();
const PetCategoryController = require("../controllers/PetCategoryController");
//const PetController = require("../controllers/PetController");

module.exports = () => {
  //GET ALL PETS
  //router.get("/", PetController.getAllPets);

  //GET DOGS
  router.get("/dogs", PetCategoryController.getDogs);

  //GET CATS
  router.get("/cats", PetCategoryController.getCats);

  //GET BIRDS
  router.get("/birds", PetCategoryController.getBirds);

  //GET OTHER
  router.get("/other", PetCategoryController.getOther);

  return router;
};
