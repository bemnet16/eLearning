import Express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  singinUser,
  updateUser,
} from "../controllers/userController.js";

const userRouter = Express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:userId", getUser);
userRouter.post("/sign", singinUser);
userRouter.post("/login", loginUser);
userRouter.patch("/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);

export default userRouter;
