import mongoose from "mongoose";

const userSchema = mongoose.Schema(
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

    role: {
      type: String,
      enum: ["user", "parent"],
      default: "user",
    },
    project: {
      type: Array,
      length: 2,
    },
    children: {
      type: Array, // only for parent
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  try {
    const salt = bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    console.log("Error at userSchema pre save", err);
  }
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
