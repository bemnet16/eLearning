import studentChatModel from "../models/studentChatModel.js";

//READ
export const getAllChats = async (req, res) => {
  try {
    const { grade, section } = req.query;
    const chats = await studentChatModel.find({ grade, section });
    res.status(200).json(chats);
  } catch (err) {
    res.status(400).json({ ERR: "getAllChats studentChatController", err });
  }
};

export const studentChats = async (req, res) => {
  try {
    const _id = req.params.userId;
    const chats = await studentChatModel.find({ userId: _id });
    res.status(200).json(chats);
  } catch (err) {
    res.status(400).json({ ERR: "studentChats studentChatController", err });
  }
};

//POST
export const sendChat = async (req, res) => {
  try {
    const newChat = await studentChatModel.create(req.body);
    res.status(201).json(newChat);
  } catch (err) {
    res.status(400).json({ ERR: "sendChat studentChatController", err });
  }
};

export const likeChat = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const userId = req.body._id;
    const chat = await studentChatModel.findById(chatId);
    if (chat.likes.get(userId)) chat.likes.delete(userId);
    else chat.likes.set(userId, true);
    chat.save();
    res.status(201).json(chat);
  } catch (err) {
    res.status(400).json({ ERR: "likeChat studentChatController", err });
  }
};

export const disLikeChat = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const userId = req.body._id;
    const chat = await studentChatModel.findById(chatId);
    if (chat.likes.get(userId) === false) chat.likes.delete(userId);
    else chat.likes.set(userId, false);
    chat.save();
    res.status(201).json(chat);
  } catch (err) {
    res.status(400).json({ ERR: "likeChat studentChatController", err });
  }
};

//UPDATE
export const updateChat = async (req, res) => {
  try {
    const _id = req.params.chatId;
    const text = req.body.text;
    const updatedChat = await studentChatModel.findOneAndUpdate(
      { _id },
      { text }
    );
    res.status(202).json(updatedChat);
  } catch (err) {
    res.status(400).json({ ERR: "updateChat studentChatController", err });
  }
};

//DELETE
export const deleteChat = async (req, res) => {
  try {
    const _id = req.params.chatId;
    const deletedChat = await studentChatModel.findByIdAndDelete(_id);
    res.status(202).json(deletedChat);
  } catch (err) {
    res.status(400).json({ ERR: "deleteChat studentChatController", err });
  }
};
