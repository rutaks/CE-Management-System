import adminController from "../../controllers/static/admin.controller";
import memberController from "../../controllers/static/member.controller";
import Router from "express";

const router = Router();

router.get("/", adminController.getMainView);
router.get("/members", memberController.getAddMemberPage);
router.post("/members", memberController.saveMember);

export default router;
