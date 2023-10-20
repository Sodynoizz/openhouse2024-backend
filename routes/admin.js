import { Router } from "express";
import { Approve, Decline, PendingLists } from "../controllers/admin.js";

const adminRouter = Router();

adminRouter.post("/approve", Approve);
adminRouter.post("/decline", Decline);
adminRouter.post("/pendings", PendingLists);

export default adminRouter;
