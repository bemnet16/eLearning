import express from "express";
import {
  sendNotification,
  seeNotification,
  signinStudent,
  loginStudent,
  allStudents,
  getStudentInfo,
  updateStudent,
  deleteStudent,
  deleteNotification,
  postAssessment,
} from "../controllers/studentController.js";
import { Authentication } from "../middlewares/auth.js";
const studentRouter = express.Router();

studentRouter.post("/sign", signinStudent);
studentRouter.post("/login", loginStudent);
studentRouter.get("/", allStudents);
studentRouter.get("/info/:studentId", getStudentInfo);
studentRouter.patch("/:studentId", Authentication, updateStudent);
studentRouter.post("/:studentId/notif", Authentication, sendNotification);
studentRouter.post(
  "/:studentId/notif/:notifId",
  Authentication,
  seeNotification
);
studentRouter.post("/:studentId/assesments", postAssessment);
studentRouter.delete("/:studentId", Authentication, deleteStudent);
studentRouter.delete(
  "/:studentId/notif/:notifId",
  Authentication,
  deleteNotification
);

export default studentRouter;
