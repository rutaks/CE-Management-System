import Router from "express";
import departmentController from "../../controllers/apis/department.controller";

const router = new Router();

router.get("/", departmentController.getDepartments);
router.post("/", departmentController.createDepartment);

export default router;
