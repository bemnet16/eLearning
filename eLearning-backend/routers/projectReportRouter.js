import Express from "express";
import {
  createProjectReport,
  deleteProjectReport,
  disLikeReport,
  getAllProjectReports,
  likeReport,
  updateProjectReport,
} from "../controllers/projectReportController.js";
const projectReportRouter = Express.Router();

projectReportRouter.get("/:projectId", getAllProjectReports);
projectReportRouter.post("/", createProjectReport);
projectReportRouter.post("/:reportId/like", likeReport);
projectReportRouter.post("/:reportId/dislike", disLikeReport);
projectReportRouter.patch("/:reportId", updateProjectReport);
projectReportRouter.delete("/:reportId", deleteProjectReport);

export default projectReportRouter;
