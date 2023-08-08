const { Router } = require("express");
const orderController = require("../controllers/orderController");

const orderRouter = Router();

orderRouter
  .get("/", orderController.getAll)
  .get("/total-sales", orderController.getTotalSales)
  .get("/status", orderController.getByStatus)
  .get("/:id", orderController.getOne)
  .post("/", orderController.create)
  .put("/:id", orderController.update)
  .delete("/:id", orderController.remove);

module.exports = orderRouter;
