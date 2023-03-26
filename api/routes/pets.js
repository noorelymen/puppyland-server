const express = require("express");
const router = express.Router();
const checkLogin = require("../middlewares/checkLogin");
const PetController = require("../controllers/PetController");

module.exports = () => {
  //GET ALL PETS
  router.get("/", PetController.getAllPets);

  //GET PET BY ID
  router.get("/:id", PetController.getPetById);

  //ADD NEW PET
  router.post("/", PetController.addNewPet);

  //UPDATE PET
  router.put("/:id", PetController.updatePet);

  //DELETE PET
  router.delete("/:id", PetController.deletePet);

  //PRIVATE ROUTE FOR TESTING
  router.get("/protectedRoute", checkLogin, (req, res) => {
    res.send("This is a private route");
  });
  return router;
};
