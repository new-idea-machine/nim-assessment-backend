import { Router } from "express";
import menuRouter from "./menuRouter.js";
import orderRouter from "./orderRouter.js";

const apiRouter = Router();

apiRouter.use("/menu", menuRouter);
apiRouter.use("/orders", orderRouter);

export default apiRouter;
