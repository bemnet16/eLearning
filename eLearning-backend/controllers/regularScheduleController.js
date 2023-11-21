import regularScheduleModel from "../models/regularScheduleModel.js";

//READ
export const getAllRegulaSchedules = async (req, res) => {
  try {
    const { grade_section } = req.query;
    let schedules;
    if (grade_section) {
      schedules = await regularScheduleModel.findOne({ grade_section });
    } else {
      schedules = await regularScheduleModel.find();
    }
    res.status(200).json(schedules);
  } catch (err) {
    res
      .status(400)
      .json({ ERR: "getAllRegulaSchedules regularScheduleController", err });
  }
};

//POST
export const createRegularSchedule = async (req, res) => {
  try {
    const newSchedule = await regularScheduleModel.create(req.body);
    res.status(201).json(newSchedule);
  } catch (err) {
    res
      .status(400)
      .json({ ERR: "createRegularSchedule regularScheduleController", err });
  }
};

//UPDATE
export const updateRegularSchedule = async (req, res) => {
  try {
    const _id = req.params.scheduleId;
    const updatedSchedule = await regularScheduleModel.findOneAndUpdate(
      { _id },
      req.body
    );
    res.status(202).json(updatedSchedule);
  } catch (err) {
    res
      .status(400)
      .json({ ERR: "createRegularSchedule regularScheduleController", err });
  }
};

//DELETE
export const deleteRegularSchedule = async (req, res) => {
  try {
    const _id = req.params.scheduleId;
    const deletedSchedule = await regularScheduleModel.findOneAndDelete({
      _id,
    });
    res.status(202).json(deletedSchedule);
  } catch (err) {
    res
      .status(400)
      .json({ ERR: "deleteRegularSchedule regularScheduleController", err });
  }
};
