import { Router} from "express";
import { addToDB, getUser, registerUser, registerUser2 } from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/add", addToDB);
userRouter.post("/get", getUser)
userRouter.post("/register", registerUser);
userRouter.post("/register2", registerUser2);

export default userRouter;
