const { Router } = require("express");
const menuRouter = require("./menuRouter");
const orderRouter = require("./orderRouter");

const apiRouter = Router();

apiRouter.use("/menu", menuRouter);
apiRouter.use("/orders", orderRouter);

module.exports = apiRouter;
