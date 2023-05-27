const Review = require("../models/Review");

//UPDATE AN EXISTING Review
exports.updateReview = async (req, res, next) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //because the find and update by id method is gonna return the unchanged object and we need it to return the object after the put method
    );
    res.status(200).json(updatedReview);
  } catch (err) {
    next(err);
  }
};

//DELETE AN EXISTING Review
exports.deleteReview = async (req, res, next) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json("Review deleted.");
  } catch (err) {
    next(err);
  }
};

//GET AN EXISITNG Review
exports.getReviewById = async (req, res, next) => {
  try {
    const Review = await Review.findById(req.params.id);
    res.status(200).json(Review);
  } catch (err) {
    next(err);
  }
};

//GET ALL ReviewS
exports.getAllReviews = async (req, res, next) => {
  try {
    const Reviews = await Review.find();
    res.status(200).json({
      msg: "Reviews get with success",
      Reviews,
    });
  } catch (err) {
    res.status(500).send(err.Review);
  }
};
