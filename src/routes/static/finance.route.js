import financeController from "../../controllers/static/finance.controller";
import Router from "express";

const router = Router();

router.get("/", financeController.getAddPartnershipPledgePage);

router.post("/partnerships", financeController.savePartnershipPledge);
router.get("/partnerships", financeController.getPartnershipPledges);
router.post(
  "/partnerships/dated",
  financeController.getDatedPartnershipPledges
);
router.get(
  "/partnerships/member/:memberId",
  financeController.getMemberPartnerships
);

router.post("/givings", financeController.saveGiving);
router.get("/givings", financeController.getGivings);

export default router;
