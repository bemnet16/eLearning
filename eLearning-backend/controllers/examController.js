import examModel from "../models/examModel.js";

// READ
export const getAllExams = async (req, res) => {
  try {
    const query = req.query;
    const exams = await examModel.find({ ...query });
    res.status(200).json(exams);
  } catch (err) {
    res
      .status(404)
      .json({ ERR: "getAllExams examController", msg: err.message });
  }
};

export const getExam = async (req, res) => {
  try {
    const _id = req.params.examId;
    const exam = await examModel.findById(_id);
    res.status(200).json(exam);
  } catch (err) {
    res.status(404).json({ ERR: "getExam examController", msg: err.message });
  }
};

//POST
export const addExam = async (req, res) => {
  try {
    const exam = await examModel.create(req.body);
    res.status(200).json(exam);
  } catch (err) {
    res.status(404).json({ ERR: "addExam ExamController", msg: err.message });
  }
};

export const giveComment = async (req, res) => {
  try {
    const _id = req.params.examId;
    const { _id: commenterId } = Jwt.verify(
      req.header("Authorization"),
      process.env.JWT_SECRET
    );
    const comment = req.body.comment;
    const exam = await examModel.findById(_id);
    await exam.comments.set(commenterId, comment);
    await exam.save();
    res.status(200).json(exam);
  } catch (err) {
    res
      .status(404)
      .json({ ERR: "giveComment ExamController", msg: err.message });
  }
};

//UPDATE
export const updateExam = async (req, res) => {
  try {
    const _id = req.params.examId;
    const exam = await examModel.findOneAndUpdate({ _id }, req.body);
    res.status(200).json(exam);
  } catch (err) {
    res
      .status(404)
      .json({ ERR: "updateExam ExamController", msg: err.message });
  }
};

//DELETE
export const deleteExam = async (req, res) => {
  try {
    const _id = req.params.examId;
    const exam = await examModel.findByIdAndDelete(_id);
    res.status(200).json({ res: "exam has been deleted successfully", exam });
  } catch (err) {
    res
      .status(404)
      .json({ ERR: "deleteExam ExamController", msg: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const _id = req.params.examId;
    const commentId = req.params.commentId;
    const { _id: commenterId } = Jwt.verify(
      req.header("Authorization"),
      process.env.JWT_SECRET
    );

    const exam = await examModel.findById(_id);
    if (commentId === commenterId) {
      await exam.comments.delete(commentId);
    } else {
      return res
        .status(203)
        .json({ msg: "you are not allowed to delete this comment" });
    }
    await exam.save();
    res.status(200).json(exam);
  } catch (err) {
    res
      .status(404)
      .json({ ERR: "deleteComment ExamController", msg: err.message });
  }
};
