import dotenv from "dotenv";
import mongoose, { connect } from "mongoose";
import getLogger from "../logger.js";

const logger = getLogger("db");
dotenv.config();
const { MONGO_URI, DB_NAME } = process.env;

const connectionString = MONGO_URI || "mongodb://localhost:27017/restaurants";
connect(`${connectionString}/${DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    console.log("It connected!", "Connected to MongoDB");
  })
  .catch((error) => console.log("error", error.message));

export default mongoose;
