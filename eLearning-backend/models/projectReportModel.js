import mongoose, { Types } from "mongoose";

const projectReportSchema = mongoose.Schema(
  {
    projectId: {
      type: Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: String, //Temp
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

const projectReportModel = mongoose.model(
  "project_report",
  projectReportSchema
);
export default projectReportModel;
