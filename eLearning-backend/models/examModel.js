import mongoose from "mongoose";

const examSchema = mongoose.Schema(
  {
    exam: {
      type: String, // only for demo it will replace by actual exam img array later!!
      required: [true, "you miss the video it is neccessary!"],
    },
    answer: {
      type: String, // only for demo it will replace by actual ans img array later!!
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
      required: true,
      enum: ["quiz", "mid", "final"],
    },
    comments: {
      type: Map,
      default: {},
    },
  },
  { timestamps: true }
);

const examModel = mongoose.model("exam", examSchema);
export default examModel;
