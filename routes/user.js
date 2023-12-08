import { Router } from "express";
import {
  addToDB,
  GetGems,
  getUser,
  registerUser,
  registerUser2,
  UpdateScore,
  AddStaff
} from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/add", addToDB);
userRouter.post("/get", getUser);
userRouter.post("/register", registerUser);
userRouter.post("/register2", registerUser2);
userRouter.post("/gems", UpdateScore);
userRouter.post("/get-gems", GetGems);
userRouter.post("/add-staff", AddStaff)

export default userRouter;
