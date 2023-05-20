const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const { login, role } = require("../middlewares/check");

module.exports = () => {
  //REGISTER A NEW USER
  router.post("/register", AuthController.register);

  //LOG IN AN EXISTING USER
  router.post("/login", AuthController.login);

  router.get("/verifylogin", login, (req, res) => {
    res.status(200).send("you are logged in");
  });

  router.get("/verifyrole", role, (req, res) => {
    res.status(200).send("you are logged in and an admin");
  });

  return router;
};
