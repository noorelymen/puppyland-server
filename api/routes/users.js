const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const { login, role } = require("../middlewares/check");

module.exports = () => {
  //GET ALL USERS
  router.get("/", UserController.getAllUsers);

  //GET USER BY ID
  router.get("/:id", UserController.getUserById);

  //UPDATE AN EXISTING USER
  router.put("/:id", login, role, UserController.updateUser);

  //DELETE AN EXISTING USER
  router.delete("/:id", login, role, UserController.deleteUser);

  return router;
};

//LAMA DEV

// import express from "express";
// import {
//   updateUser,
//   deleteUser,
//   getUser,
//   getUsers,
// } from "../controllers/user.js";
// import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

// const router = express.Router();

// // router.get("/checkauthentication", verifyToken, (req,res,next)=>{
// //   res.send("hello user, you are logged in")
// // })

// // router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
// //   res.send("hello user, you are logged in and you can delete your account")
// // })

// // router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
// //   res.send("hello admin, you are logged in and you can delete all accounts")
// // })

// //UPDATE
// router.put("/:id", verifyUser, updateUser);

// //DELETE
// router.delete("/:id", verifyUser, deleteUser);

// //GET
// router.get("/:id", verifyUser, getUser);

// //GET ALL
// router.get("/", verifyAdmin, getUsers);

// export default router;
