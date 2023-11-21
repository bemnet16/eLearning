import taskModel from "../models/taskModel.js";

//READ
export const getAllTasks = async (req, res) => {
  try {
    const { grade_section } = req.query;
    let tasks;
    if (grade_section) {
      tasks = await taskModel.find({ grade_section });
    } else {
      tasks = await taskModel.find();
    }
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ ERR: "getAllTasks taskController", err });
  }
};

//POST
export const createTask = async (req, res) => {
  try {
    const newTask = await taskModel.create(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ ERR: "createTask taskController", err });
  }
};

//UPDATE
export const updateTask = async (req, res) => {
  try {
    const _id = req.params.taskId;
    const updatedTask = await taskModel.findOneAndUpdate({ _id }, req.body);
    res.status(202).json(updatedTask);
  } catch (err) {
    res.status(400).json({ ERR: "createTask taskController", err });
  }
};

//DELETE
export const deleteTask = async (req, res) => {
  try {
    const _id = req.params.taskId;
    const deletedTask = await taskModel.findOneAndDelete({
      _id,
    });
    res.status(202).json(deletedTask);
  } catch (err) {
    res.status(400).json({ ERR: "deleteTask taskController", err });
  }
};
