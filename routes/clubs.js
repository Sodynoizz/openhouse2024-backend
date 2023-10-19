import { Router } from "express";
import {
  CreateClubs,
  GetClubLists,
  Edit,
  AddReview,
  DeleteReview,
} from "../controllers/clubs.js";

const clubsRouter = Router();

clubsRouter.get("/clublists", GetClubLists);
clubsRouter.post("/create", CreateClubs);
clubsRouter.post("/edit", Edit);
clubsRouter.post("/add-review", AddReview);
clubsRouter.post("/delete-review", DeleteReview);

export default clubsRouter;
