import { Router } from "express";
import orderController from "../controllers/orderController.js";

const orderRouter = Router();

orderRouter.get("/", orderController.getAll);
orderRouter.get("/:id", orderController.getOne);
orderRouter.post("/", orderController.create);
orderRouter.put("/:id", orderController.update);
orderRouter.delete("/:id", orderController.remove);
orderRouter.get("/total-sales/:id", orderController.getOneTotal);
orderRouter.get("/total-sales/", orderController.getTotal);

export default orderRouter;
