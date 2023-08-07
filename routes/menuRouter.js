const { Router } = require("express");
const menuController = require("../controllers/menuController");

const menuRouter = Router();

menuRouter.get("/search", menuController.fuzzySearch);
menuRouter.get("/:id", menuController.getOne);
menuRouter.get("/", menuController.getAll);
menuRouter.put("/:id", menuController.updateItem);
menuRouter.post("/", menuController.create);
menuRouter.delete("/:id", menuController.deleteItem);

module.exports = menuRouter;
