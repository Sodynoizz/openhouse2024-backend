import { Router } from "express";
import {
  AddReview,
  CreateLessonPlans,
  DeleteReview,
  Edit,
  GetLessonPlanLists,
} from "../controllers/lessonplan.js";

const lessonplansRouter = Router();

lessonplansRouter.post("/create", CreateLessonPlans);
lessonplansRouter.post("/edit", Edit);
lessonplansRouter.get("/get", GetLessonPlanLists);
lessonplansRouter.post("/add-review", AddReview);
lessonplansRouter.post("/delete-review", DeleteReview);

export default lessonplansRouter;
