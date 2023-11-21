import Express from "express";
import {
  addVideo,
  deleteVideo,
  getAllVideos,
  getVideo,
  updateVideo,
  giveComment,
  deleteComment,
} from "../controllers/videoController.js";
const videoRouter = Express.Router();

videoRouter.get("/", getAllVideos);
videoRouter.get("/:videoId", getVideo);
videoRouter.post("/", addVideo);
videoRouter.post("/:videoId/comment", giveComment);
videoRouter.patch("/:videoId", updateVideo);
videoRouter.delete("/:videoId", deleteVideo);
videoRouter.delete("/:videoId/comment/:commentId", deleteComment);

export default videoRouter;
