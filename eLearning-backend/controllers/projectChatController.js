import projectChatModel from "../models/projectChatModel.js";

//READ
export const getAllProjectChats = async (req, res) => {
  try {
    const projectChats = await projectChatModel.find({
      projectId: req.params.projectId,
    });
    res.status(200).json(projectChats);
  } catch (err) {
    res
      .status(404)
      .json({ ERR: "getAllProjectChats projectChatController", err });
  }
};

export const getUserProjectChats = async (req, res) => {
  try {
    const { projectId, userId } = req.body;
    const userChats = await projectChatModel.find({ projectId, userId });
    res.status(200).json(userChats);
  } catch (err) {
    res
      .status(404)
      .json({ ERR: "getAllProjectChats projectChatController", err });
  }
};

//POST
export const sendProjectChat = async (req, res) => {
  try {
    const newProjectChat = await projectChatModel.create(req.body);
    res.status(201).json(newProjectChat);
  } catch (err) {
    res
      .status(404)
      .json({ ERR: "getAllProjectChats projectChatController", err });
  }
};

//UPDATE
export const updateProjectChat = async (req, res) => {
  try {
    const _id = req.params.projectChatId;
    const UpdatedProjectChat = await projectChatModel.findOneAndUpdate(
      { _id },
      { text: req.body.text }
    );
    res.status(202).json(UpdatedProjectChat);
  } catch (err) {
    res
      .status(404)
      .json({ ERR: "getAllProjectChats projectChatController", err });
  }
};

//DELETE
export const deleteProjectChat = async (req, res) => {
  try {
    const _id = req.params.projectChatId;
    const deletedProjectChat = await projectChatModel.findOneAndDelete({ _id });
    res.status(202).json(deletedProjectChat);
  } catch (err) {
    res
      .status(404)
      .json({ ERR: "getAllProjectChats projectChatController", err });
  }
};
