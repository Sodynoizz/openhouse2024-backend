import { Router } from "express";
import { Record } from "../controllers/roles.js";

const rolesRouter = Router();

rolesRouter.post("/record", Record);

export default rolesRouter;
