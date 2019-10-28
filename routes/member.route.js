import Router from "express";
import memberController from "../controllers/member.controller";

const router = Router();

router.post("/", memberController.createMember);

export default router;
