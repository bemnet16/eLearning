import mongoose, { Types } from "mongoose";

const studentChatSchema = mongoose.Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    likes: {
      type: Map,
      of: Boolean,
      default: {},
    },
  },
  { timestamps: true }
);

const studentChatModel = mongoose.model("student_chat", studentChatSchema);
export default studentChatModel;
