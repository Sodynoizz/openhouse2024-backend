import { Router } from "express";
import adminRouter from "./admin.js";
import rolesRouter from "./roles.js";
import clubsRouter from "./clubs.js";
import lessonplansRouter from "./lessonplans.js";
import giftedRouter from "./gifted.js";
import organizationRouter from "./organization.js";

const router = Router();

router.use("/roles", rolesRouter);
router.use("/clubs", clubsRouter);
router.use("/lessons", lessonplansRouter);
router.use("/admin", adminRouter);
router.use("/gifted", giftedRouter);
router.use("/organization", organizationRouter);

export default router;
