import Router from "express";
import memberController from "../../controllers/apis/member.controller";

const router = Router();

router.post("/", memberController.createMember);

export default router;
