import authController from "../../controllers/static/auth.controller";
import Router from "express";
import isAuth from "../../middlewares/isAuth";

const router = Router();

router.get("/login", authController.getLoginPage);
router.post("/login", authController.login);

router.get("/logout", authController.logout);

router.get("/signup", authController.getSignupPage);
router.post("/signup", authController.signup);

export default router;
