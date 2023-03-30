const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const checkLogin = require("../middlewares/checkLogin");

module.exports = () => {
  //GET ALL USERS
  router.get("/", UserController.getAllUsers);

  //GET USER BY ID
  router.get("/:id", UserController.getUserById);

  //UPDATE AN EXISTING USER
  router.put("/:id", UserController.updateUser);

  //DELETE AN EXISTING USER
  router.delete("/:id", UserController.deleteUser);

  router.get("/verifytoken", checkLogin, (req, res) => {
    res.status(200).send("Authorized");
  });

  return router;
};
