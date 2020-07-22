import { Router } from "express";
import ToDoController from "../controller/ToDoController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

router.get("/list", [checkJwt], ToDoController.list);
router.post("/add", [checkJwt], ToDoController.add);
router.patch(
  "/update/:id([0-9]+)",
  [checkJwt],
  ToDoController.update
);
router.delete(
  "/delete/:id([0-9]+)",
  [checkJwt],
  ToDoController.delete
);

export default router;
