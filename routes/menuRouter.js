const { Router } = require("express");
const menuController = require("../controllers/menuController");

const menuRouter = Router();

menuRouter.get("/", menuController.getAll);
menuRouter.get("/search", menuController.search);
menuRouter.get("/:id", menuController.getOne);
menuRouter.put("/:id", menuController.updateOne);
menuRouter.delete("/:id", menuController.deleteOne);
menuRouter.post("/", menuController.create);

module.exports = menuRouter;
