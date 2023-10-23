import { Router } from "express";
import multer from "multer";
import {
  CreateOrganization,
  Edit,
  GetOrganizationLists,
  AddReview,
  DeleteReview,
  UploadImage,
  GetImage,
  UploadProfile,
  GetProfile,
} from "../controllers/organization.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const organizationRouter = Router();

organizationRouter.post("/create", CreateOrganization);
organizationRouter.post("/edit", Edit);
organizationRouter.get("/get", GetOrganizationLists);
organizationRouter.post("/add-review", AddReview);
organizationRouter.post("/delete-review", DeleteReview);
organizationRouter.post("/upload-image", upload.single("file"), UploadImage);
organizationRouter.post("/get-image", GetImage);
organizationRouter.post(
  "/upload-profile",
  upload.single("file"),
  UploadProfile
);
organizationRouter.post("/get-profile", GetProfile);

export default organizationRouter;
