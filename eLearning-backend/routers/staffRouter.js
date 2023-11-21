import Express from "express";
import {
  deleteStaffMember,
  getAllStaffMembers,
  getStaffMember,
  loginStaffMember,
  singinStaffMember,
  updateStaffMember,
} from "../controllers/staffController.js";
const staffRouter = Express.Router();

staffRouter.get("/", getAllStaffMembers);
staffRouter.get("/:staffId", getStaffMember);
staffRouter.post("/sign", singinStaffMember);
staffRouter.post("/login", loginStaffMember);
staffRouter.patch("/:staffId", updateStaffMember);
staffRouter.delete("/:staffId", deleteStaffMember);

export default staffRouter;
