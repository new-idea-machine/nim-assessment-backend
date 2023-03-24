const express = require("express");
require("dotenv").config();

const cors = require("cors");
const getLogger = require("./logger.js");
const apiRouter = require("./routes/apiRouter.js");

const { PORT } = process.env;
const logger = getLogger("server");
const app = express();
logger.log("It connected!", "Connected to MongoDB");
app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

const server = app.listen(PORT, () => {
  logger.log(`Server running on port ${PORT}`);
});

module.exports = server;
