import memberController from "../../controllers/static/member.controller";
import Router from "express";

const router = Router();

router.get("/", memberController.getAddPage);

export default router;
