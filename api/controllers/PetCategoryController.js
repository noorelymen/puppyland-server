exports.getPetsInCategory = async (req, res, next) => {
  console.log("category");
  try {
    const category = req.params.category;
    console.log("category");
    console.log(category);
    setTimeout(async () => {
      const pets = await Pet.find({
        category: category.charAt(0).toUpperCase() + category.slice(1),
      });
      res.status(200).json(pets);
    }, 1000);
  } catch (err) {
    next(err);
  }
};
