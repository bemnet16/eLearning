import mongoose, { Types } from "mongoose";

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    images: {
      type: String, //Temp
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    participants: {
      type: Map,
      of: Boolean,
      default: {},
    },
  },
  { timestamps: true }
);

const projectModel = mongoose.model("project", projectSchema);
export default projectModel;
