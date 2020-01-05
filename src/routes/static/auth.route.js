import authController from "../../controllers/static/auth.controller";
import Router from "express";
import isAuth from "../../middlewares/isAuth";

const router = Router();

router.get("/", (req, res) => {
  return res.redirect("/login");
});

router.get("/login", authController.getLoginPage);
router.post("/login", authController.login);

router.get("/logout", authController.logout);

router.get("/signup", isAuth, authController.getSignupPage);
router.post("/signup", isAuth, authController.signup);

router.get("/forgot-password", authController.getForgotPasswordPage);
router.post("/forgot-password", authController.forgotPassword);

router.get("/reset/password/:token", authController.resetPasswordPage);
router.post("/reset/password/:token", authController.resetPassword);

export default router;
