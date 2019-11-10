"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _admin = _interopRequireDefault(require("../../controllers/static/admin.controller"));

var _member = _interopRequireDefault(require("../../controllers/static/member.controller"));

var _express = _interopRequireDefault(require("express"));

var _isAuth = _interopRequireDefault(require("../../middlewares/isAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express["default"])();
router.get("/", _isAuth["default"], _admin["default"].getMainView);
router.get("/members", _isAuth["default"], _member["default"].getAddMemberPage);
router.post("/members", _isAuth["default"], _member["default"].saveMember);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=admin.route.js.map