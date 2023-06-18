const express = require("express");

require("dotenv").config(); //read the MONGO environment variable from the .env file which contains the MongoDB connection string
require("./config/db").connect();

const apiRoutes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // third partie middleware
app.use(bodyParser.json());
app.use(cookieParser());

// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(cors({ origin: "https://puppyland.netlify.app", credentials: true }));

//MIDLLEWARES
app.use("/api", apiRoutes());

const PORT = process.env.PORT;

//after executing the route middleware the next() function will send back here and executes whats inside
app.use((err, req, res, next) => {
  //send a response to the user
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong.";
  // return res.status(errorStatus).send(errorMessage);
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(PORT, () => console.log(`App is listening on port: ${PORT}`));
