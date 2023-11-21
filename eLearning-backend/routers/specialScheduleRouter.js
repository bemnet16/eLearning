import Express from "express";
import {
  createSpecialSchedule,
  deleteSpecialSchedule,
  getAllSpecialSchedules,
  updateSpecialSchedule,
} from "../controllers/specialScheduleController.js";
const specialScheduleRouter = Express.Router();

specialScheduleRouter.get("/", getAllSpecialSchedules);
specialScheduleRouter.post("/", createSpecialSchedule);
specialScheduleRouter.patch("/:scheduleId", updateSpecialSchedule);
specialScheduleRouter.delete("/:scheduleId", deleteSpecialSchedule);

export default specialScheduleRouter;
