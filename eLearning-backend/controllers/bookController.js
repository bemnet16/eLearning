import bookModel from "../models/bookMode.js";
import Jwt from "jsonwebtoken";

// READ
export const getAllBooks = async (req, res) => {
  try {
    const query = req.query;
    const books = await bookModel.find({ ...query });
    res.status(200).json(books);
  } catch (err) {
    res
      .status(404)
      .json({ ERR: "getAllbooks bookController", msg: err.message });
  }
};

export const getBook = async (req, res) => {
  try {
    const _id = req.params.bookId;
    const book = await bookModel.findById(_id);
    res.status(200).json(book);
  } catch (err) {
    res.status(404).json({ ERR: "getbook bookController", msg: err.message });
  }
};

//POST
export const addBook = async (req, res) => {
  try {
    const book = await bookModel.create(req.body);
    res.status(200).json(book);
  } catch (err) {
    res.status(404).json({ ERR: "addbook bookController", msg: err.message });
  }
};

export const giveComment = async (req, res) => {
  try {
    const _id = req.params.bookId;
    // const { _id: commenterId } = Jwt.verify(
    //   req.header("Authorization"),
    //   process.env.JWT_SECRET
    // );
    const { _id: commenterId, comment } = req.body; //
    // const comment = req.body.comment;
    const book = await bookModel.findById(_id);
    await book.comments.set(commenterId, comment);
    await book.save();
    res.status(200).json(book);
  } catch (err) {
    res
      .status(404)
      .json({ ERR: "giveComment bookController", msg: err.message });
  }
};

//UPDATE
export const updateBook = async (req, res) => {
  try {
    const _id = req.params.bookId;
    const book = await bookModel.findOneAndUpdate({ _id }, req.body);
    res.status(200).json(book);
  } catch (err) {
    res
      .status(404)
      .json({ ERR: "updatebook bookController", msg: err.message });
  }
};

//DELETE
export const deleteBook = async (req, res) => {
  try {
    const _id = req.params.bookId;
    const book = await bookModel.findByIdAndDelete(_id);
    res.status(200).json({ res: "book has been deleted successfully", book });
  } catch (err) {
    res
      .status(404)
      .json({ ERR: "deletebook bookController", msg: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const _id = req.params.bookId;
    const commentId = req.params.commentId;
    const { _id: commenterId } = Jwt.verify(
      req.header("Authorization"),
      process.env.JWT_SECRET
    );

    const book = await bookModel.findById(_id);
    if (commentId === commenterId) {
      await book.comments.delete(commentId);
    } else {
      return res
        .status(203)
        .json({ msg: "you are not allowed to delete this comment" });
    }

    await book.save();
    res.status(200).json(book);
  } catch (err) {
    res
      .status(404)
      .json({ ERR: "deleteComment bookController", msg: err.message });
  }
};
