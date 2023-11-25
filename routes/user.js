import { Router} from "express";
import { addToDB } from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/add", addToDB);

export default userRouter;
