const { Router } = require("express");
const menuController = require("../controllers/menuController");

const menuRouter = Router();

menuRouter.get("/", menuController.getAll);
menuRouter.get("/search", menuController.searchQuery);
menuRouter.get("/:id", menuController.getOne);
menuRouter.put("/:id", menuController.update);
menuRouter.post("/", menuController.create);
menuRouter.delete("/:id", menuController.deleteItem);

module.exports = menuRouter;
