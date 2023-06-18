const express = require("express");
const router = express.Router();

const AdoptionController = require("../controllers/AdoptionController");
const { login, role } = require("../middlewares/check");

module.exports = () => {
  //CREATE A NEW ADOPTION
  router.post("/:puppyId", login, AdoptionController.createAdoption);

  //GET ALL ADOPTIONS
  router.get("/", login, AdoptionController.getAdoptions);

  return router;
};
