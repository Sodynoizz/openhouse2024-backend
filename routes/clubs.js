import { Router } from "express";
import { CreateClubs, GetClubLists, } from "../controllers/clubs.js";

const clubsRouter = Router();

// @desc    Get clubs lists
// @route   GET /api/roles/clublists
// @params  -
// @access  Public
clubsRouter.get("/clublists", GetClubLists);

clubsRouter.post("/createclubs", CreateClubs);


export default clubsRouter;
