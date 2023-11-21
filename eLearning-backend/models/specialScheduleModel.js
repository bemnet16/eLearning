import mongoose from "mongoose";

const specialScheduleSchema = mongoose.Schema(
  {
    grade_section: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    for_student: {
      type: String,
      default: "all",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    for_date: {
      type: String, /// later change with actual time and date
      required: true,
    },
  },
  { timestamps: true }
);

const specialScheduleModel = mongoose.model(
  "special_schedule",
  specialScheduleSchema
);
export default specialScheduleModel;
