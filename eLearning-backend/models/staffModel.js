import mongoose from "mongoose";

const staffSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      enum: [
        "maths",
        "english",
        "physics",
        "biology",
        "chemistry",
        "civics",
        "amharic",
        "hpe",
        "ict",
        "geography",
        "drawing",
        "history",
      ],
    },
    role: {
      type: String,
      enum: ["teacher", "director", "library"],
      default: "teacher",
    },
    grade_section: {
      type: Array,
      length: 5,
    },
    section_control: String,
    project_control: {
      type: Array,
      length: 2,
    },
  },
  { timestamps: true }
);

staffSchema.pre("save", async function () {
  try {
    const salt = bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    console.log("Error at staffSchema pre save", err);
  }
});

const staffModel = mongoose.model("staff", staffSchema);
export default staffModel;
