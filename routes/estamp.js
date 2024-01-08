import { Router } from "express";
import { UpdateEstamp, GetEstampUser, ResetEstampUser } from "../controllers/estamp.js";

const estampRouter = Router();

estampRouter.post("/update", UpdateEstamp);
estampRouter.post("/get", GetEstampUser);
estampRouter.post("/reset", ResetEstampUser);

export default estampRouter;