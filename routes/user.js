import { Router } from "express";
import {
  addToDB,
  GetGems,
  getUser,
  registerUser,
  registerUser2,
  UpdateScore,
  AddStaff,
  GetStaffInfo,
  getUserInfo,
  ScreenShot
} from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/add", addToDB);
userRouter.post("/has-account", getUser);
userRouter.post("/get", getUserInfo);
userRouter.post("/register", registerUser);
userRouter.post("/register2", registerUser2);
userRouter.post("/gems", UpdateScore);
userRouter.post("/get-gems", GetGems);
userRouter.post("/add-staff", AddStaff);
userRouter.post("/get-staff", GetStaffInfo);
userRouter.post("/screenshot", ScreenShot)

export default userRouter;
