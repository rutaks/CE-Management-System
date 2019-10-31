import authRoutes from "./static/auth.route";
import adminRoutes from "./static/admin.route";
import partnershipPledgeRoutes from "./static/partnershipPledge.route";
import isAuth from "../middlewares/isAuth";

import Router from "express";

const router = Router();

router.use("/", authRoutes);
router.use("/admin", isAuth, adminRoutes);
router.use("/admin/pledges/partnerships", isAuth, partnershipPledgeRoutes);

export default router;
