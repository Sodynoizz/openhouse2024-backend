import { Router } from "express";
import {
  // CreateClubs,
  GetClubLists,
  Edit,
  AddReview,
  DeleteReview,
} from "../controllers/clubs.js";

const clubsRouter = Router();

clubsRouter.get("/lists", GetClubLists);
clubsRouter.post("/edit", Edit);
clubsRouter.post("/add-review", AddReview);
clubsRouter.post("/delete-review", DeleteReview);
// clubsRouter.post("/create", CreateClubs);

export default clubsRouter;
