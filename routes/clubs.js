import { Router } from "express";
import multer from "multer";
import {
  CreateClubs,
  GetClubLists,
  Edit,
  AddReview,
  DeleteReview,
  UploadImage,
  GetImage,
  UploadProfile,
  GetProfile,
  UploadLogo,
  GetLogo
} from "../controllers/clubs.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const clubsRouter = Router();

clubsRouter.post("/create", CreateClubs);
clubsRouter.get("/lists", GetClubLists);
clubsRouter.post("/edit", Edit);
clubsRouter.post("/add-review", AddReview);
clubsRouter.post("/delete-review", DeleteReview);
clubsRouter.post("/upload-image", upload.single("file"), UploadImage);
clubsRouter.post("/get-image", GetImage);
clubsRouter.post("/upload-profile", upload.single("file"), UploadProfile);
clubsRouter.post("/get-profile", GetProfile);
clubsRouter.post("/upload-logo", upload.single("file"), UploadLogo);
clubsRouter.post("/get-logo", GetLogo);

export default clubsRouter;
