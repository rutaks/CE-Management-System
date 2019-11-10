import memberController from "../../controllers/static/member.controller";
import Router from "express";
import isAuth from "../../middlewares/isAuth";

const router = Router();

router.get("/", isAuth, memberController.getAddPage);

export default router;
