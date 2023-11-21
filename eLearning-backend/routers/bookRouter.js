import Express from "express";
import {
  addBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
  giveComment,
  deleteComment,
} from "../controllers/bookController.js";
const bookRouter = Express.Router();

bookRouter.get("/", getAllBooks);
bookRouter.get("/:bookId", getBook);
bookRouter.post("/", addBook); // first see the role
bookRouter.post("/:bookId/comment", giveComment);
bookRouter.patch("/:bookId", updateBook);
bookRouter.delete("/:bookId", deleteBook); // see role and if he is teacher equalize grade and subject
bookRouter.delete("/:bookId/comment/:commentId", deleteComment);

export default bookRouter;
