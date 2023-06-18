const express = require("express");
const router = express.Router();

const ReviewController = require("../controllers/ReviewController");
const { login, role } = require("../middlewares/check");

module.exports = () => {
  //CREATE REVIEW
  router.post("/", login, ReviewController.createReview);

  //GET REVIEWS BY PUPPY ID
  router.get("/:puppyId", ReviewController.getReviews);

  //DELETE REVIEW
  router.delete("/:id", login, role, ReviewController.deleteReview);
  return router;
};
