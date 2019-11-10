"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _member = _interopRequireDefault(require("../../controllers/static/member.controller"));

var _express = _interopRequireDefault(require("express"));

var _isAuth = _interopRequireDefault(require("../../middlewares/isAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express["default"])();
router.get("/", _isAuth["default"], _member["default"].getAddPage);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=member.route.js.map