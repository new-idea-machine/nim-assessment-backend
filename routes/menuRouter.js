const { Router } = require("express");
const menuController = require("../controllers/menuController");

const menuRouter = Router();

menuRouter
  .get("/", menuController.getAllMenu)
  .get("/search", menuController.searchMenu)
  .get("/:id", menuController.getOneMenu)
  .post("/", menuController.createMenu)
  .put("/:id", menuController.updateMenu)
  .delete("/:id", menuController.deleteMenu);

module.exports = menuRouter;
