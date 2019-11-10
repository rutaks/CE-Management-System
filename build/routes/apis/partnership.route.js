"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _partnership = _interopRequireDefault(require("../../controllers/apis/partnership.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express["default"])();
router.post("/", _partnership["default"].createPartnership);
router.get("/", _partnership["default"].getPartnerships);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=partnership.route.js.map