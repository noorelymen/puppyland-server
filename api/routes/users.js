const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const checkLogin = require("../middlewares/checkLogin");

module.exports = () => {
  //GET ALL USERS
  router.post("/", UserController.getAllUsers);

  //GET USER BY ID
  router.get("/:id", UserController.getUserById);

  //ADD NEW USER

  //UPDATE AN EXISTING USER

  //DELETE AN EXISTING USER

  router.get("/verifytoken", checkLogin, (req, res) => {
    res.status(200).send("Authorized");
  });

  return router;
};
