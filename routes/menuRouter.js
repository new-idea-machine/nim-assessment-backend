const { Router } = require("express");
const menuController = require("../controllers/menuController");

const menuRouter = Router();

menuRouter.get("/", menuController.getAll);
menuRouter.get("/:id", menuController.getOne);
menuRouter.put("/:id", menuController.updateItem);
menuRouter.post("/", menuController.create);

module.exports = menuRouter;
