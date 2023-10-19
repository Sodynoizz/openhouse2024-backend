import { Router } from "express";
import rolesRouter from "./roles.js";
import clubsRouter from "./clubs.js";

const router = Router();

router.use("/roles", rolesRouter);
router.use("/clubs", clubsRouter);

export default router;
