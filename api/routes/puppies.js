const express = require("express");
const router = express.Router();
const { login, role } = require("../middlewares/check");
const PuppyController = require("../controllers/PuppyController");

module.exports = () => {
  //GET ALL PuppyS
  router.get("/", PuppyController.getAllPuppies);

  //GET Puppy BY ID
  router.get("/:id", PuppyController.getPuppyById);

  //ADD NEW Puppy
  router.post("/", login, role, PuppyController.addNewPuppy);

  //UPDATE Puppy
  router.put("/:id", PuppyController.updatePuppy);

  //DELETE Puppy
  router.delete("/:id", login, role, PuppyController.deletePuppy);

  return router;
};
