import Express from "express";
import {
  addProject,
  deleteProject,
  getAllProjects,
  getOneProject,
  loginToProject,
  updateProject,
} from "../controllers/projectController.js";
const projectRouter = Express.Router();

projectRouter.get("/", getAllProjects);
projectRouter.get("/:projectId", getOneProject);
projectRouter.post("/", addProject);
projectRouter.post("/:projectId/login", loginToProject);
projectRouter.patch("/:projectId", updateProject);
projectRouter.delete("/:projectId", deleteProject);

export default projectRouter;
