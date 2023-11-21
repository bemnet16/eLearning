import Express from "express";
import {
  createRegularSchedule,
  deleteRegularSchedule,
  getAllRegulaSchedules,
  updateRegularSchedule,
} from "../controllers/regularScheduleController.js";
const regularScheduleRouter = Express.Router();

regularScheduleRouter.get("/", getAllRegulaSchedules);
regularScheduleRouter.post("/", createRegularSchedule);
regularScheduleRouter.patch("/:scheduleId", updateRegularSchedule);
regularScheduleRouter.delete("/:scheduleId", deleteRegularSchedule);

export default regularScheduleRouter;
