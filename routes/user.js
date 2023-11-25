import { Router} from "express";
import { addToDB, getUser } from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/add", addToDB);
userRouter.post("/get", getUser)

export default userRouter;
