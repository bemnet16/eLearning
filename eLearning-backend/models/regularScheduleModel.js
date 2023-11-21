import mongoose from "mongoose";

const regularScheduleSchema = mongoose.Schema(
  {
    grade_section: {
      type: String,
      required: true,
      unique: true,
    },
    schedule: {
      type: Map,
      required: true,
      default: {
        Mon: [],
        Tue: [],
        Wed: [],
        Thu: [],
        Fir: [],
      },
    },
  },
  { timestamps: true }
);

const regularScheduleModel = mongoose.model(
  "regular_schedule",
  regularScheduleSchema
);
export default regularScheduleModel;
