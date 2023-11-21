import mongoose from "mongoose";
import bcrypt from "bcrypt";

const studentSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "first name is required"],
    },
    lastname: {
      type: String,
      required: [true, "last name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    photo: {
      type: String,
      default: "",
    },
    grade: {
      type: Number,
      required: [true, "grade is required"],
    },
    section: {
      type: String,
      required: [true, "section is required"],
    },
    rank: Number,
    seen: {
      type: Array,
      default: [],
    },
    unseen: {
      type: Array,
      default: [],
    },
    projects: {
      type: Array,
      default: [],
    },
    favorites: {
      type: Array,
      default: [],
    },
    assesments: {
      type: Map,
      default: {
        maths: { quizone: -1, quiztwo: -1, mid: -1, final: -1 },
        english: { quizone: -1, quiztwo: -1, mid: -1, final: -1 },
      },
    },
    attendance: {
      type: Array,
      default: [],
    },
    role: {
      type: String,
      enum: ["student"],
      required: true,
      default: "student",
    },
  },
  { timestamps: true }
);

studentSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    console.log("Error at studentschema pre save", err);
  }
});

const studentModel = mongoose.model("student", studentSchema);
export default studentModel;
