import memberRoutes from "./apis/member.route";
import fellowshipRoutes from "./apis/fellowship.route";
import departmentRoutes from "./apis/department.route";
import partnershipRoutes from "./apis/partnership.route";
import givingCategoryRoutes from "./apis/giving_category.routes";
import attendanceRoutes from "./apis/attendance.route";
import Router from "express";
import Responses from "../helpers/responses";

const router = Router();

router.get("/", (req, res) => {
  Responses.send201(res, "Welcome To CE Management System", {});
});

router.use("/fellowships", fellowshipRoutes);
router.use("/departments", departmentRoutes);
router.use("/members", memberRoutes);
router.use("/partnerships", partnershipRoutes);
router.use("/givings", givingCategoryRoutes);
router.use("/attendance", attendanceRoutes);
export default router;
