const express = require("express");
const router = express.Router();
const { login, role } = require("../middlewares/check");
const PuppyController = require("../controllers/PuppyController");

module.exports = () => {
  //GET ALL PUPPIES
  router.get("/", PuppyController.getAllPuppies);

  //GET PUPPY BY ID
  router.get("/:id", PuppyController.getPuppyById);

  //ADD NEW PUPPY
  router.post("/", login, role, PuppyController.addNewPuppy);

  //UPDATE PUPPY
  router.put("/:id", login, role, PuppyController.updatePuppy);

  //DELETE PUPPY
  router.delete("/:id", login, role, PuppyController.deletePuppy);

  return router;
};
