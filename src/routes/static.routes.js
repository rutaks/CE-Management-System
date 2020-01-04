import authRoutes from "./static/auth.route";
import adminRoutes from "./static/admin.route";
import financeRoutes from "./static/finance.route";
import isAuth from "../middlewares/isAuth";
import Router from "express";

const router = Router();

router.use("/", authRoutes);
router.use("/admin", isAuth, adminRoutes);
router.use("/admin/finances/", isAuth, financeRoutes);

export default router;
