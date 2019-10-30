import Router from "express";
import fellowshipController from "../../controllers/apis/fellowship.controller";

const router = new Router();

router.get("/", fellowshipController.getFellowships);
router.post("/", fellowshipController.createFellowship);

export default router;
