"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _member = _interopRequireDefault(require("./apis/member.route"));

var _fellowship = _interopRequireDefault(require("./apis/fellowship.route"));

var _department = _interopRequireDefault(require("./apis/department.route"));

var _partnership = _interopRequireDefault(require("./apis/partnership.route"));

var _giving_category = _interopRequireDefault(require("./apis/giving_category.routes"));

var _express = _interopRequireDefault(require("express"));

var _responses = _interopRequireDefault(require("../helpers/responses"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express["default"])(); //TODO: -PLACE IN ITS OWN FUNCTION

router.get("/", function (req, res) {
  _responses["default"].send201(res, "Welcome To CE Management System", {});
});
router.use("/fellowships", _fellowship["default"]);
router.use("/departments", _department["default"]);
router.use("/members", _member["default"]);
router.use("/partnerships", _partnership["default"]);
router.use("/givings", _giving_category["default"]);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=api.routes.js.map