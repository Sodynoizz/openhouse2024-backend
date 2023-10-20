import { Router } from "express";
import adminRouter from "./admin.js";
import rolesRouter from "./roles.js";
import clubsRouter from "./clubs.js";
import lessonplansRouter from "./lessonplans.js";

const router = Router();

router.use("/roles", rolesRouter);
router.use("/clubs", clubsRouter);
router.use("/lessons", lessonplansRouter);
router.use("/admin", adminRouter);

export default router;
