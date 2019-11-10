"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _parternshipPledge = _interopRequireDefault(require("../../controllers/static/parternshipPledge.controller"));

var _express = _interopRequireDefault(require("express"));

var _isAuth = _interopRequireDefault(require("../../middlewares/isAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express["default"])();
router.get("/", _isAuth["default"], _parternshipPledge["default"].getAddPartnershipPledgePage);
router.post("/partnerships", _isAuth["default"], _parternshipPledge["default"].savePartnershipPledge);
router.get("/partnerships", _isAuth["default"], _parternshipPledge["default"].getPartnershipPledges);
router.post("/partnerships/dated", _isAuth["default"], _parternshipPledge["default"].getDatedPartnershipPledges);
router.get("/partnerships/member/:memberId", _isAuth["default"], _parternshipPledge["default"].getMemberPartnerships);
router.post("/givings", _isAuth["default"], _parternshipPledge["default"].saveGiving);
router.get("/givings", _isAuth["default"], _parternshipPledge["default"].getGivings);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=partnershipPledge.route.js.map