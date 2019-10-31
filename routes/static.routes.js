import adminRoutes from "./static/admin.route";
import partnershipPledgeRoutes from "./static/partnershipPledge.route";

import Router from "express";

const router = Router();

router.use("/admin", adminRoutes);
router.use("/admin/pledges/partnerships", partnershipPledgeRoutes);

export default router;
