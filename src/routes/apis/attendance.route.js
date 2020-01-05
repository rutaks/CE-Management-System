import Router from "express";
import attendanceController from "../../controllers/apis/attendance.controller";

const router = new Router();

router.get("/add/:memberId", attendanceController.addToAttendance);
router.get("/", attendanceController.getAttendance);

export default router;
