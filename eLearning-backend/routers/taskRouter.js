import Express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/taskController.js";

const taskRouter = Express.Router();

taskRouter.get("/", getAllTasks);
taskRouter.post("/", createTask);
taskRouter.patch("/:taskId", updateTask);
taskRouter.delete("/:taskId", deleteTask);

export default taskRouter;
