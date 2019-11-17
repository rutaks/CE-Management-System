import adminController from "../../controllers/static/admin.controller";
import memberController from "../../controllers/static/member.controller";
import Router from "express";
import isAuth from "../../middlewares/isAuth";

const router = Router();

router.get("/", isAuth, adminController.getMainView);
router.get("/members", memberController.getAddMemberPage);
router.post("/members", memberController.saveMember);

export default router;
