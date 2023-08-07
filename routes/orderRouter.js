const { Router } = require("express");
const orderController = require("../controllers/orderController");

const orderRouter = Router();

orderRouter.get("/total-sales", orderController.totalSales);
orderRouter.get("/status", orderController.getByStatus);
orderRouter.get("/:id", orderController.getOne);
orderRouter.get("/", orderController.getAll);
orderRouter.post("/", orderController.create);
orderRouter.put("/:id", orderController.update);
orderRouter.delete("/:id", orderController.remove);

module.exports = orderRouter;
