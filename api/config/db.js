// DATABASE CONNECTION
const mongoose = require("mongoose");
const { MONGO_DEV_URL } = process.env;
exports.connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    const dbConn = await mongoose.connect(MONGO_DEV_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to database ${dbConn.connections[0].name}`);
  } catch (err) {
    console.log(`Error conecting to DB: ${err.message}`);
  }
};
