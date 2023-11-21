import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import videoRouter from "./routers/videoRouter.js";
import bookRouter from "./routers/bookRouter.js";
import examRouter from "./routers/examRouter.js";
import studentChatRouter from "./routers/studentChatRouter.js";
import projectRouter from "./routers/projectRouter.js";
import projectChatRouter from "./routers/projectChatRouter.js";
import projectReportRouter from "./routers/projectReportRouter.js";
import regularScheduleRouter from "./routers/regulaScheduleRouter.js";
import specialScheduleRouter from "./routers/specialScheduleRouter.js";
import taskRouter from "./routers/taskRouter.js";
import studentRouter from "./routers/studentRouter.js";
import staffRouter from "./routers/staffRouter.js";
import userRouter from "./routers/userRouter.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.text());
app.use(cookieParser());

//I don't know what does below do
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  // res.setHeader("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose
  .connect(process.env.DB_URL)
  .then((res) => {
    app.listen(process.env.PORT, () => {
      console.log(`yes, DB connected to port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB not connected", err);
  });

app.use("/student", studentRouter);
app.use("/staff", staffRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);
app.use("/book", bookRouter);
app.use("/exam", examRouter);
app.use("/student_chat", studentChatRouter);
app.use("/project", projectRouter);
app.use("/project_chat", projectChatRouter);
app.use("/project_report", projectReportRouter);
app.use("/regular_schedule", regularScheduleRouter);
app.use("/special_schedule", specialScheduleRouter);
app.use("/task", taskRouter);
