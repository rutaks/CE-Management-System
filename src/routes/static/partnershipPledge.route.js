import partnershipPledgeController from "../../controllers/static/parternshipPledge.controller";
import Router from "express";
import isAuth from "../../middlewares/isAuth";

const router = Router();

router.get(
  "/",
  isAuth,
  partnershipPledgeController.getAddPartnershipPledgePage
);
router.post(
  "/partnerships",
  isAuth,
  partnershipPledgeController.savePartnershipPledge
);
router.get(
  "/partnerships",
  isAuth,
  partnershipPledgeController.getPartnershipPledges
);
router.post(
  "/partnerships/dated",
  isAuth,
  partnershipPledgeController.getDatedPartnershipPledges
);
router.get(
  "/partnerships/member/:memberId",
  isAuth,
  partnershipPledgeController.getMemberPartnerships
);

router.post("/givings", isAuth, partnershipPledgeController.saveGiving);
router.get("/givings", isAuth, partnershipPledgeController.getGivings);

export default router;
