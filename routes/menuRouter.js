import { Router } from "express";
import menuController from "../controllers/menuController.js";

const menuRouter = Router();

menuRouter.get("/", menuController.getAll);
menuRouter.get("/:id", menuController.getOne);
menuRouter.post("/", menuController.create);
menuRouter.patch("/:id", menuController.update);

export default menuRouter;
