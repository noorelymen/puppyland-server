const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const checkLogin = require("../middlewares/checkLogin");

module.exports = () => {
  //REGISTER A NEW USER
  router.post("/register", AuthController.register);

  //LOG IN AN EXISTING USER
  router.post("/login", AuthController.login);

  router.get("/verifytoken", checkLogin, (req, res) => {
    res.status(200).send("Authorized");
  });

  return router;
};
