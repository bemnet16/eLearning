import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";

//READ
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (!users) return res.status(203).json({ ERR: "no users" });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ ERR: "getAllUsers userController", err });
  }
};

export const getUser = async (req, res) => {
  try {
    const _id = req.params.userId;
    const user = await userModel.findById(_id);
    if (!user)
      return res.status(203).json({ ERR: "there is no member getUser" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ ERR: "getUser userController", err });
  }
};

//POST
export const singinUser = async (req, res) => {
  try {
    if (!validator.isEmail(req.body.email))
      return res.status(203).json({ MSG: "invalid email signinStaff" });
    if (!validator.isStrongPassword(req.body.password))
      return res.status(203).json({ MSG: "weak password signinStaff" });

    const newUser = await userModel.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ ERR: "singinUser userController", err });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.find({ email });
    if (!user) return res.status(203).json({ MSG: "email doesn't exist" });
    const verified = await bcrypt.compare(password, user.password);
    if (!verified)
      return res.status(203).json({ MSG: "incorrect password loginStaff" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ ERR: "loginUser userController", err });
  }
};

//UPDATE
export const updateUser = async (req, res) => {
  try {
    const _id = req.params.userId;
    const user = await userModel.findOneAndUpdate({ _id }, req.body);
    res.status(202).json(user);
  } catch (err) {
    res.status(400).json({ ERR: "updateUser userController", err });
  }
};

//DELETE
export const deleteUser = async (req, res) => {
  try {
    const _id = req.params.userId;
    const user = await userModel.findOneAndDelete({ _id });
    res.status(202).json(user);
  } catch (err) {
    res.status(400).json({ ERR: "deleteUser userController", err });
  }
};
