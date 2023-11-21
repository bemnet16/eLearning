import studentModel from "../models/studentModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { Types } from "mongoose";
import Jwt from "jsonwebtoken";

const NoValue = (name, fun) => {
  return res.status(203).json({ msg: `there is no ${name}, EMPTY (${fun})` });
};

//READ
export const allStudents = async (req, res) => {
  try {
    const query = req.query;
    const students = await studentModel.find({ ...query });
    if (!students) NoValue("students", "allStudents");
    const finalStudents = students.map(
      ({ _id, firstname, lastname, email, rank, photo }) => {
        return { _id, firstname, lastname, email, rank, photo };
      }
    );
    res.status(200).json(finalStudents);
  } catch (err) {
    res.status(400).json({ ERR: "allStudents studentController", err });
  }
};

export const getStudentInfo = async (req, res) => {
  try {
    const student = await studentModel.findById(req.params.studentId);
    if (!student) NoValue("student", "getStudentInfo");
    const { _id, firstname, lastname, grade, section, rank, photo, email } =
      student;
    res
      .status(200)
      .json({ _id, firstname, lastname, email, grade, section, rank, photo });
  } catch (err) {
    res
      .status(400)
      .json({ ERR: "getStudentInfo studentController", msg: err.message });
  }
};

//POST
export const signinStudent = async (req, res) => {
  try {
    // if (!validator.isEmail(req.body.email)) {
    //   return res.status(201).json({ ms: "invalid email" });
    // }
    // if (!validator.isStrongPassword(req.body.password)) {
    //   return res.status(201).json({ ms: "weak password" });
    // }

    const newStudent = await studentModel.create(req.body);
    const token = Jwt.sign(
      { _id: newStudent._id, role: newStudent.role },
      process.env.JWT_SECRET
    );
    res.cookie("userdata", token);
    res.status(201).json({ newStudent, token });
  } catch (err) {
    res.status(400).json({ ERR: "signinStudent studentController", err });
  }
};

export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await studentModel.findOne({ email: email });
    if (!student) {
      return res.status(404).json({ ERR: "email doesn't exist!!" });
    }
    const verified = await bcrypt.compare(password, student.password);
    if (!verified) {
      return res.status(404).json({ ERR: "Incorrect password!!" });
    }

    const token = Jwt.sign(
      { _id: student._id, role: student.role },
      process.env.JWT_SECRET
    );
    res.cookie("userdata", token, { maxAge: 3000 });
    res.status(200).json({ student, token });
  } catch (err) {
    res.status(400).json({ ERR: "loginStudent studentController", err });
  }
};

export const sendNotification = async (req, res) => {
  try {
    const _id = req.params.studentId;
    const { notifId, notif } = req.body;
    const student = await studentModel.findById(_id);
    await student.unseen.push({ _id: notifId, notif });
    await student.save();
    res.status(203).json(student.unseen);
  } catch (err) {
    res.status(400).json({ ERR: "sendNotification studentController", err });
  }
};

export const seeNotification = async (req, res) => {
  try {
    const { studentId: _id, notifId } = req.params;
    const student = await studentModel.findById(_id);
    const notification = student.unseen.find((notif) => notif._id === notifId);
    student.unseen = await student.unseen.filter(
      (notif) => notif._id !== notification._id
    );
    if (notification) await student.seen.push(notification);
    await student.save();
    res.status(203).json(student);
  } catch (err) {
    res.status(400).json({ ERR: "seeNotification studentController", err });
  }
};

export const postAssessment = async (req, res) => {
  try {
    const _id = req.params.studentId;
    const { sub, marks } = req.body;

    const student = await studentModel.findById(_id);
    const subAss = student.assesments.get(sub);
    for (let mark in marks) {
      if (subAss[mark]) subAss[mark] = marks[mark];
    }
    await student.save();
    res.status(203).json(student);
  } catch (err) {
    res.status(400).json({ ERR: "postAssessment studentController", err });
  }
};

//UPDATE
export const updateStudent = async (req, res) => {
  try {
    const _id = req.params.studentId;
    let password = req.body.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    }
    const student = await studentModel.findOneAndUpdate(
      { _id },
      { ...req.body, password },
      {
        new: true,
      }
    );
    res.status(203).json(student);
  } catch (err) {
    res.status(400).json({ ERR: "updateStudent studentController", err });
  }
};

//DELETE
export const deleteStudent = async (req, res) => {
  try {
    const _id = req.params.studentId;
    const student = await studentModel.findByIdAndDelete(_id);
    res
      .status(200)
      .json({ res: "student has been deleted successfully", student });
  } catch (err) {
    res.status(400).json({ ERR: "deleteStudent studentController", err });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { studentId: _id, notifId } = req.params;
    const student = await studentModel.findById(_id);
    student.seen = student.seen.filter((notif) => notif._id !== notifId);
    student.unseen = student.unseen.filter((notif) => notif._id !== notifId);
    await student.save();
    res.status(203).json(student);
  } catch (err) {
    res.status(400).json({ ERR: "deleteNotification studentController", err });
  }
};
