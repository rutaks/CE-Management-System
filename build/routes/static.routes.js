"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _auth = _interopRequireDefault(require("./static/auth.route"));

var _admin = _interopRequireDefault(require("./static/admin.route"));

var _partnershipPledge = _interopRequireDefault(require("./static/partnershipPledge.route"));

var _isAuth = _interopRequireDefault(require("../middlewares/isAuth"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express["default"])();
router.use("/", _auth["default"]);
router.use("/admin", _admin["default"]);
router.use("/admin/pledges/", _partnershipPledge["default"]);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=static.routes.js.map