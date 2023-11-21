import staffModel from "../models/staffModel.js";
import validator from "validator";
import bcrypt from "bcrypt";

//READ
export const getAllStaffMembers = async (req, res) => {
  try {
    const staffMembers = await staffModel.find();
    if (!staffMembers) return res.status(203).json({ ERR: "no staffMembers" });
    res.status(200).json(staffMembers);
  } catch (err) {
    res.status(400).json({ ERR: "getAllStaffMembers staffController", err });
  }
};

export const getStaffMember = async (req, res) => {
  try {
    const _id = req.params.staffId;
    const staffMember = await staffModel.findById(_id);
    if (!staffMember)
      return res.status(203).json({ ERR: "there is no member getStaffMember" });
    res.status(200).json(staffMember);
  } catch (err) {
    res.status(400).json({ ERR: "getStaffMember staffController", err });
  }
};

//POST
export const singinStaffMember = async (req, res) => {
  try {
    if (!validator.isEmail(req.body.email))
      return res.status(203).json({ MSG: "invalid email signinStaff" });
    if (!validator.isStrongPassword(req.body.password))
      return res.status(203).json({ MSG: "weak password signinStaff" });

    const newMember = await staffModel.create(req.body);
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ ERR: "singinStaffMember staffController", err });
  }
};

export const loginStaffMember = async (req, res) => {
  try {
    const { email, password } = req.body;
    const staffMember = await staffModel.find({ email });
    if (!staffMember)
      return res.status(203).json({ MSG: "email doesn't exist" });
    const verified = await bcrypt.compare(password, staffMember.password);
    if (!verified)
      return res.status(203).json({ MSG: "incorrect password loginStaff" });
    res.status(200).json(staffMember);
  } catch (err) {
    res.status(400).json({ ERR: "loginStaffMember staffController", err });
  }
};

//UPDATE
export const updateStaffMember = async (req, res) => {
  try {
    const _id = req.params.staffId;
    const staffMember = await staffModel.findOneAndUpdate({ _id }, req.body);
    res.status(202).json(staffMember);
  } catch (err) {
    res.status(400).json({ ERR: "updateStaffMember staffController", err });
  }
};

//DELETE
export const deleteStaffMember = async (req, res) => {
  try {
    const _id = req.params.staffId;
    const staffMember = await staffModel.findOneAndDelete({ _id });
    res.status(202).json(staffMember);
  } catch (err) {
    res.status(400).json({ ERR: "deleteStaffMember staffController", err });
  }
};
