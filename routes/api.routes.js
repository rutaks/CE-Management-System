import memberRoutes from "../routes/member.route";
import fellowshipRoutes from "../routes/fellowship.route";
import Router from "express";

const router = Router();

router.use("/fellowships", fellowshipRoutes);
router.use("/members", memberRoutes);

export default router;
