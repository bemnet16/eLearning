import Express from "express";
import {
  addExam,
  deleteExam,
  getAllExams,
  getExam,
  updateExam,
  giveComment,
  deleteComment,
} from "../controllers/examController.js";
const examRouter = Express.Router();

examRouter.get("/", getAllExams);
examRouter.get("/:examId", getExam);
examRouter.post("/", addExam);
examRouter.post("/:examId/comment", giveComment);
examRouter.patch("/:examId", updateExam);
examRouter.delete("/:examId", deleteExam);
examRouter.delete("/:examId/comment/:commentId", deleteComment);

export default examRouter;
