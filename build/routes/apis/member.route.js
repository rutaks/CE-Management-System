"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _member = _interopRequireDefault(require("../../controllers/apis/member.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express["default"])();
router.post("/", _member["default"].createMember);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=member.route.js.map