const { Router } = require("express");
const menuRouter = require("./menuRouter.js");
const orderRouter = require("./orderRouter.js");

const apiRouter = Router();

apiRouter.use("/menu", menuRouter);
apiRouter.use("/orders", orderRouter);

module.exports = apiRouter;
