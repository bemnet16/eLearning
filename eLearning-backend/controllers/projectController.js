import projectModel from "../models/projectModel.js";

//READ
export const getAllProjects = async (req, res) => {
  try {
    const projects = await projectModel.find();
    // const finalProjects = projects.map(
    //   ({ title, images, description, _id }) => {
    //     return { title, images, description, _id };
    //   }
    // );
    res.status(200).json(projects);
  } catch (err) {
    res.status(404).json({ ERR: "getAllProjects projectController", err });
  }
};

export const getOneProject = async (req, res) => {
  try {
    const _id = req.params.projectId;
    const project = await projectModel.findById(_id);
    res.status(200).json(project);
  } catch (err) {
    res.status(404).json({ ERR: "getOneProject projectController", err });
  }
};

//POST
export const addProject = async (req, res) => {
  try {
    const newProject = await projectModel.create({
      ...req.body,
      participants: {},
    });
    res.status(201).json(newProject);
  } catch (err) {
    res.status(404).json({ ERR: "addProject projectController", err });
  }
};

export const loginToProject = async (req, res) => {
  try {
    const _id = req.params.projectId;
    const userId = req.body._id;
    const project = await projectModel.findById(_id);
    const isUser = project.participants.get(userId);

    if (isUser === undefined) project.participants.set(userId, true);
    else if (isUser) project.participants.set(userId, false);
    else
      return res.status(203).json({ msg: "you can't log in again, sorry!!" });
    project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(404).json({ ERR: "loginToProject projectController", err });
  }
};

//UPDATE
export const updateProject = async (req, res) => {
  try {
    const _id = req.params.projectId;
    const updatedProject = await projectModel.findOneAndUpdate(
      { _id },
      req.body
    );
    // Hacker's will update participants
    res.status(202).json(updatedProject);
  } catch (err) {
    res.status(404).json({ ERR: "updateProject projectController", err });
  }
};

//DELETE
export const deleteProject = async (req, res) => {
  try {
    const _id = req.params.projectId;
    const deletetedProject = await projectModel.findOneAndDelete({ _id });
    /* DELETE all chats and reports from projectChats and projectReport risepctively */
    res.status(202).json(deletetedProject);
  } catch (err) {
    res.status(404).json({ ERR: "deleteProject projectController", err });
  }
};
