import { Router } from "express";
import multer from "multer";
import {
  CreateGiftedPlans,
  Edit,
  GetGiftedLists,
  AddReview,
  DeleteReview,
  UploadImage,
  GetImage,
  UploadProfile,
  GetProfile,
} from "../controllers/gifted.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const giftedRouter = Router();

giftedRouter.post("/create", CreateGiftedPlans);
giftedRouter.post("/edit", Edit);
giftedRouter.get("/get", GetGiftedLists);
giftedRouter.post("/add-review", AddReview);
giftedRouter.post("/delete-review", DeleteReview);
giftedRouter.post("/upload-image", upload.single("file"), UploadImage);
giftedRouter.post("/get-image", GetImage);
giftedRouter.post("/upload-profile", upload.single("file"), UploadProfile);
giftedRouter.post("/get-profile", GetProfile);

export default giftedRouter;
