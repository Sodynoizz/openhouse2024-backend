import { Router } from "express";
import { Record } from "../controllers/roles.js";

const rolesRouter = Router();

// @desc    Record user's info
// @route   POST /api/roles/record
// @params  { email, tag, name }
// @access  Public
rolesRouter.post("/record", Record);

export default rolesRouter;
