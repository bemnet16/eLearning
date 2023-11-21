import mongoose from "mongoose";

const videoSchema = mongoose.Schema(
  {
    video: {
      type: String, // only for demo it will replace by actual video later!!
      required: [true, "you miss the video it is neccessary!"],
    },
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["videolink"],
      default: "videolink",
    },
    comments: {
      type: Map,
      default: {},
    },
  },
  { timestamps: true }
);

const videoModel = mongoose.model("video", videoSchema);
export default videoModel;
