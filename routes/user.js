import { Router } from "express";
import { GetGems, UpdateScore } from "../controllers/quiz.js";
import { ScreenShot } from "../controllers/screenshot.js";
import { AddStaff, GetStaffInfo } from "../controllers/staff.js";
import {
  addToDB,
  checkUsername,
  getUser,
  registerUser,
  registerUser2,
  getUserInfo,
  getUserByID,
} from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/add", addToDB);
userRouter.post("/has-account", getUser);
userRouter.post("/get", getUserInfo);
userRouter.post("/getbyID", getUserByID)
userRouter.post("/register", registerUser);
userRouter.post("/register2", registerUser2);
userRouter.post("/gems", UpdateScore);
userRouter.post("/get-gems", GetGems);
userRouter.post("/add-staff", AddStaff);
userRouter.post("/get-staff", GetStaffInfo);
userRouter.post("/screenshot", ScreenShot)
userRouter.get("/check-username/:username", checkUsername)

export default userRouter;
