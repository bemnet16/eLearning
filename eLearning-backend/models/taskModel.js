import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    grade_section: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    for_student: {
      type: String,
      default: "all",
    },
    for_date: {
      type: String, /// later change with actual time and date
      required: true,
    },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("task", taskSchema);
export default taskModel;
