import Router from "express";
import partnershipController from "../../controllers/apis/partnership.controller";

const router = Router();

router.post("/", partnershipController.createPartnership);
router.get("/", partnershipController.getPartnerships);

export default router;
