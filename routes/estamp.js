import { Router } from "express";
import { UpdateEstamp, GetEstampUser } from "../controllers/estamp.js";

const estampRouter = Router();

estampRouter.post("/update", UpdateEstamp);
estampRouter.post("/get", GetEstampUser);

export default estampRouter;