import adminController from "../../controllers/static/admin.controller";
import Router from "express";

const router = Router();

router.get("/", adminController.getMainView);

export default router;
