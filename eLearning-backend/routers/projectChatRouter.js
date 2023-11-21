import Express from "express";
import {
  deleteProjectChat,
  getAllProjectChats,
  getUserProjectChats,
  sendProjectChat,
  updateProjectChat,
} from "../controllers/projectChatController.js";
const projectChatRouter = Express.Router();

projectChatRouter.get("/:projectId", getAllProjectChats);
projectChatRouter.get("/user", getUserProjectChats);
projectChatRouter.post("/", sendProjectChat);
projectChatRouter.patch("/:projectChatId", updateProjectChat);
projectChatRouter.delete("/:projectChatId", deleteProjectChat);

export default projectChatRouter;
