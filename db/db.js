const dotenv = require("dotenv");
const mongoose = require("mongoose");
const getLogger = require("../logger.js");

const logger = getLogger("db");
dotenv.config();
const { MONGO_URI, DB_NAME } = process.env;

const connectionString = MONGO_URI || "mongodb://localhost:27017/restaurants";
mongoose
  .connect(`${connectionString}/${DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    logger.log("It connected!", "Connected to MongoDB");
  })
  .catch((error) => logger.log("error", error.message));

module.exports = mongoose;
