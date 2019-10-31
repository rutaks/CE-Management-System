import partnershipPledgeController from "../../controllers/static/parternshipPledge.controller";
import Router from "express";

const router = Router();

router.get("/", partnershipPledgeController.getAddPartnershipPledgePage);
router.post("/", partnershipPledgeController.savePartnershipPledge);

router.get("/history", partnershipPledgeController.getPartnershipPledges);

export default router;
