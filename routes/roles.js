import { Router } from "express";
import { Info, Record } from "../controllers/roles.js";

const rolesRouter = Router();

rolesRouter.post("/record", Record);
rolesRouter.post("/info", Info);

export default rolesRouter;
