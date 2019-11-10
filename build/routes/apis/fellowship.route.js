"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _fellowship = _interopRequireDefault(require("../../controllers/apis/fellowship.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = new _express["default"]();
router.get("/", _fellowship["default"].getFellowships);
router.post("/", _fellowship["default"].createFellowship);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=fellowship.route.js.map