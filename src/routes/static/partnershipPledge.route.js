import partnershipPledgeController from "../../controllers/static/parternshipPledge.controller";
import Router from "express";
import isAuth from "../../middlewares/isAuth";

const router = Router();

router.get(
  "/",

  partnershipPledgeController.getAddPartnershipPledgePage
);
router.post(
  "/partnerships",

  partnershipPledgeController.savePartnershipPledge
);
router.get(
  "/partnerships",

  partnershipPledgeController.getPartnershipPledges
);
router.post(
  "/partnerships/dated",

  partnershipPledgeController.getDatedPartnershipPledges
);
router.get(
  "/partnerships/member/:memberId",

  partnershipPledgeController.getMemberPartnerships
);

router.post("/givings", isAuth, partnershipPledgeController.saveGiving);
router.get("/givings", isAuth, partnershipPledgeController.getGivings);

export default router;
