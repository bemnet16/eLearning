import Express from "express";
import {
  deleteChat,
  disLikeChat,
  getAllChats,
  likeChat,
  sendChat,
  studentChats,
  updateChat,
} from "../controllers/studentChatController.js";
const studentChatRouter = Express.Router();

studentChatRouter.get("/", getAllChats);
studentChatRouter.get("/:userId", studentChats);
studentChatRouter.post("/", sendChat);
studentChatRouter.post("/:chatId/like", likeChat);
studentChatRouter.post("/:chatId/dislike", disLikeChat);
studentChatRouter.patch("/:chatId", updateChat);
studentChatRouter.delete("/:chatId", deleteChat);

export default studentChatRouter;
