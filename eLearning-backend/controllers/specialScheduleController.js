import specialScheduleModel from "../models/specialScheduleModel.js";

//READ
export const getAllSpecialSchedules = async (req, res) => {
  try {
    const { grade_section } = req.query;
    let schedules;
    if (grade_section) {
      schedules = await specialScheduleModel.find({ grade_section });
    } else {
      schedules = await specialScheduleModel.find();
    }
    res.status(200).json(schedules);
  } catch (err) {
    res
      .status(400)
      .json({ ERR: "getAllSpecialSchedules specialScheduleController", err });
  }
};

//POST
export const createSpecialSchedule = async (req, res) => {
  try {
    const newSchedule = await specialScheduleModel.create(req.body);
    res.status(201).json(newSchedule);
  } catch (err) {
    res
      .status(400)
      .json({ ERR: "createSpecialSchedule specialScheduleController", err });
  }
};

//UPDATE
export const updateSpecialSchedule = async (req, res) => {
  try {
    const _id = req.params.scheduleId;
    const updatedSchedule = await specialScheduleModel.findOneAndUpdate(
      { _id },
      req.body
    );
    res.status(202).json(updatedSchedule);
  } catch (err) {
    res
      .status(400)
      .json({ ERR: "createSpecialSchedule specialScheduleController", err });
  }
};

//DELETE
export const deleteSpecialSchedule = async (req, res) => {
  try {
    const _id = req.params.scheduleId;
    const deletedSchedule = await specialScheduleModel.findOneAndDelete({
      _id,
    });
    res.status(202).json(deletedSchedule);
  } catch (err) {
    res
      .status(400)
      .json({ ERR: "deleteSpecialSchedule specialScheduleController", err });
  }
};
