import projectReportModel from "../models/projectReportModel.js";

//READ
export const getAllProjectReports = async (req, res) => {
  try {
    const projectId = req.params.projectId; //will changed to query selector
    //all report ONLY for admins
    // const reports = await projectReportModel.find();
    const reports = await projectReportModel.find({ projectId });
    res.status(200).json(reports);
  } catch (err) {
    res
      .status(404)
      .json({ ERR: "getAllProjectReports ProjectReportController", err });
  }
};

//POST
export const createProjectReport = async (req, res) => {
  try {
    const newProjectReport = await projectReportModel.create(req.body);
    res.status(201).json(newProjectReport);
  } catch (err) {
    res
      .status(404)
      .json({ ERR: "createProjectReport ProjectReportController", err });
  }
};

export const likeReport = async (req, res) => {
  try {
    const reportId = req.params.reportId;
    const userId = req.body._id;
    const report = await projectReportModel.findById(reportId);
    if (report.likes.get(userId)) report.likes.delete(userId);
    else report.likes.set(userId, true);
    report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ ERR: "likeChat studentController", err });
  }
};

export const disLikeReport = async (req, res) => {
  try {
    const reportId = req.params.reportId;
    const userId = req.body._id;
    const report = await projectReportModel.findById(reportId);
    if (report.likes.get(userId) === false) report.likes.delete(userId);
    else report.likes.set(userId, false);
    report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ ERR: "likeChat studentController", err });
  }
};

//UPDATE
export const updateProjectReport = async (req, res) => {
  try {
    const _id = req.params.reportId;
    const updatedReport = await projectReportModel.findOneAndUpdate(
      { _id },
      req.body
    );
    res.status(202).json(updatedReport);
  } catch (err) {
    res
      .status(404)
      .json({ ERR: "updateProjectReport ProjectReportController", err });
  }
};

//DELETE
export const deleteProjectReport = async (req, res) => {
  try {
    const _id = req.params.reportId;
    const deletedReport = await projectReportModel.findOneAndDelete({ _id });
    res.status(202).json(deletedReport);
  } catch (err) {
    res
      .status(404)
      .json({ ERR: "deleteProjectReport ProjectReportController", err });
  }
};
