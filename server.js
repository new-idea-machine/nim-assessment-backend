const express = require("express");
require("dotenv").config();
const cors = require("cors");
const getLogger = require("./logger");
const apiRouter = require("./routes/apiRouter");

const { PORT } = process.env;
const logger = getLogger("server");
const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

app.listen(PORT, () => {
  logger.log(`Server running on port ${PORT}`);
});
