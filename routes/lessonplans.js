import { Router } from "express";
import multer from "multer";
import {
  CreateLessonPlans,
  AddReview,
  DeleteReview,
  Edit,
  GetLessonPlanLists,
  UploadImage,
  GetImage,
  UploadProfile,
  GetProfile,
} from "../controllers/lessonplan.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const lessonplansRouter = Router();

lessonplansRouter.post("/create", CreateLessonPlans);
lessonplansRouter.post("/edit", Edit);
lessonplansRouter.get("/get", GetLessonPlanLists);
lessonplansRouter.post("/add-review", AddReview);
lessonplansRouter.post("/delete-review", DeleteReview);
lessonplansRouter.post("/upload-image", upload.single("file"), UploadImage);
lessonplansRouter.post("/get-image", GetImage);
lessonplansRouter.post("/upload-profile", upload.single("file"), UploadProfile);
lessonplansRouter.post("/get-profile", GetProfile);

export default lessonplansRouter;
