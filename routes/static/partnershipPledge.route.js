import partnershipPledgeController from "../../controllers/static/parternshipPledge.controller";
import Router from "express";

const router = Router();

router.get("/", partnershipPledgeController.getAddPartnershipPledgePage);
router.post("/partnerships", partnershipPledgeController.savePartnershipPledge);
router.get("/partnerships", partnershipPledgeController.getPartnershipPledges);

router.post("/givings", partnershipPledgeController.saveGiving);
router.get("/givings", partnershipPledgeController.getGivings);

export default router;
