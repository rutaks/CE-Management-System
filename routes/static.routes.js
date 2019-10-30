import adminRoutes from "./static/admin.route";
import Router from "express";

const router = Router();

router.use("/admin", adminRoutes);

export default router;
