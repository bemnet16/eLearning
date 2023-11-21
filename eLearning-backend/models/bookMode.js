import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    book: {
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
      enum: ["regularbook", "extrabook"],
      default: "regularbook",
    },
    comments: {
      type: Map,
      default: {},
    },
  },
  { timestamps: true }
);

const bookModel = mongoose.model("book", bookSchema);
export default bookModel;
