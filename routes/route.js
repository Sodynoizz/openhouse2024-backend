import { Router } from "express";
import adminRouter from "./admin.js";
import clubsRouter from "./clubs.js";
import estampRouter from "./estamp.js";
import giftedRouter from "./gifted.js";
import lessonplansRouter from "./lessonplans.js";
import organizationRouter from "./organization.js";
import rolesRouter from "./roles.js";
import userRouter from "./user.js";
import { Stats } from "../controllers/stats.js";

const router = Router();

router.use("/admin", adminRouter);
router.use("/clubs", clubsRouter);
router.use("/estamp", estampRouter);
router.use("/gifted", giftedRouter);
router.use("/lessons", lessonplansRouter);
router.use("/organization", organizationRouter);
router.use("/roles", rolesRouter);
router.use("/user", userRouter);
router.get("/stats", Stats)

export default router;
