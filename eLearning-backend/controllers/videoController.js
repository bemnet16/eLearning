import videoModel from "../models/videoModel.js";
import Jwt from "jsonwebtoken";

// READ
export const getAllVideos = async (req, res) => {
  try {
    const query = req.query;
    const videos = await videoModel.find({ ...query });
    res.status(200).json(videos);
  } catch (err) {
    res
      .status(404)
      .json({ ERR: "getAllVideos videoController", msg: err.message });
  }
};

export const getVideo = async (req, res) => {
  try {
    const _id = req.params.videoId;
    const video = await videoModel.findById(_id);
    res.status(200).json(video);
  } catch (err) {
    res.status(404).json({ ERR: "getVideo videoController", msg: err.message });
  }
};

//POST
export const addVideo = async (req, res) => {
  try {
    const video = await videoModel.create(req.body);
    res.status(200).json(video);
  } catch (err) {
    res.status(404).json({ ERR: "addVideo videoController", msg: err.message });
  }
};

export const giveComment = async (req, res) => {
  try {
    const _id = req.params.videoId;
    // const { _id: commenterId } = Jwt.verify(
    //   req.header("Authorization"),
    //   process.env.JWT_SECRET
    // );
    const { _id: commenterId, comment } = req.body; //
    // const comment = req.body.comment;
    const video = await videoModel.findById(_id);
    await video.comments.set(commenterId, comment);
    await video.save();
    res.status(200).json(video);
  } catch (err) {
    res
      .status(404)
      .json({ ERR: "giveComment videoController", msg: err.message });
  }
};

//UPDATE
export const updateVideo = async (req, res) => {
  try {
    const _id = req.params.videoId;
    const video = await videoModel.findOneAndUpdate({ _id }, req.body);
    res.status(200).json(video);
  } catch (err) {
    res
      .status(404)
      .json({ ERR: "updateVideo videoController", msg: err.message });
  }
};

//DELETE
export const deleteVideo = async (req, res) => {
  try {
    const _id = req.params.videoId;
    const video = await videoModel.findByIdAndDelete(_id);
    res.status(200).json({ res: "video has been deleted successfully", video });
  } catch (err) {
    res
      .status(404)
      .json({ ERR: "deleteVideo videoController", msg: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const _id = req.params.videoId;
    const commentId = req.params.commentId;
    const { _id: commenterId } = Jwt.verify(
      req.header("Authorization"),
      process.env.JWT_SECRET
    );

    // To prevent hacker delete someone else comment
    const video = await videoModel.findById(_id);
    if (commentId === commenterId) {
      await video.comments.delete(commentId);
    } else {
      return res
        .status(203)
        .json({ msg: "you are not allowed to delete this comment" });
    }
    await video.save();
    res.status(200).json(video);
  } catch (err) {
    res.status(404).json({ ERR: "deleteComment videoController", msg: err });
  }
};
