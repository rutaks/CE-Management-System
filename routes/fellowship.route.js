import Router from "express";
import fellowshipController from "../controllers/fellowship.controller";

const router = new Router();

router.get("/", fellowshipController.getFellowships);
router.post("/", fellowshipController.createFellowship);

export default router;
