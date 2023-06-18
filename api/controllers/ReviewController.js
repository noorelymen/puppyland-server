const Review = require("../models/Review");
const User = require("../models/User");
const createError = require("../utils/error");

//CREATE A REVIEW
exports.createReview = async (req, res, next) => {
  //create a new Puppy
  //if (req.user.isRescuer)
  //return next(createError(403, `Rescuers can't add reviews.`));

  const newReview = new Review({
    userId: req.user._id.toString(),
    puppyId: req.body.puppyId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    //if already reviewed can't review again
    const review = await Review.findOne({
      puppyId: req.body.puppyId,
      userId: req.user._id,
    });

    if (review)
      return next(createError(403, "You have already added a review."));

    const savedReview = await newReview.save();

    await User.findByIdAndUpdate(req.body.userId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).json(savedReview);
  } catch (err) {
    next(err);
  }
};

//GET REVIEWS
exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ puppyId: req.params.puppyId });
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};

//DELETE A REVIEW
exports.deleteReview = async (req, res, next) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json("Review deleted.");
  } catch (err) {
    next(err);
  }
};
