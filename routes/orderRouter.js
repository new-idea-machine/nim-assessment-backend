const { Router } = require("express");
const orderController = require("../controllers/orderController.js");

const orderRouter = Router();

orderRouter.get("/", orderController.getAll);
orderRouter.post("/", orderController.create);
orderRouter.get("/total-sales", orderController.getTotal);
orderRouter.get("/total-sales-by-date", orderController.getTotalbyDate);
orderRouter.get("/status", orderController.getByStatus);
orderRouter.get("/status-by-date", orderController.getByStatusByDate);
orderRouter.delete("/:id", orderController.remove);
orderRouter.put("/:id", orderController.update);
orderRouter.get("/:id", orderController.getOne);
orderRouter.get("/total-sales/:id", orderController.getOneTotal);

module.exports = orderRouter;
