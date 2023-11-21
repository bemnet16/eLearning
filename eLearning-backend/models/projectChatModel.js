import mongoose, { Types } from "mongoose";

const projectChatSchema = mongoose.Schema(
  {
    projectId: {
      type: Types.ObjectId,
      required: true,
    },
    participantId: {
      type: Types.ObjectId,
      required: true,
    },
    participantRole: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const projectChatModel = mongoose.model("project_chat", projectChatSchema);
export default projectChatModel;
