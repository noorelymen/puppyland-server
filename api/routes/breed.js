const express = require("express");
const router = express.Router();
const BreedController = require("../controllers/BreedController");
//const PuppyController = require("../controllers/PuppyController");

module.exports = () => {
  //GET GERMAN SHEPHERDS
  router.get("/germanshepherds", BreedController.getGermanShepherds);

  //GET ROTWEILERS
  router.get("/rotweilers", BreedController.getRotweilers);

  //GET GOLDEN RETRIEVERS
  router.get("/goldenretrievers", BreedController.getGoldenRetrievers);

  //GET HUSKIES
  router.get("/huskies", BreedController.getHuskies);

  //GET OTHER
  router.get("/other", BreedController.getOther);

  return router;
};
