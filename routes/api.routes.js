import memberRoutes from "./apis/member.route";
import fellowshipRoutes from "./apis/fellowship.route";
import Router from "express";
import Responses from "../helpers/responses";

const router = Router();

//TODO: -PLACE IN ITS OWN FUNCTION
router.get("/", (req, res) => {
  Responses.send201(res, "Welcome To CE Management System", {});
});

router.use("/fellowships", fellowshipRoutes);
router.use("/members", memberRoutes);

export default router;
