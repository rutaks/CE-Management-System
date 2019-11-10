"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _auth = _interopRequireDefault(require("../../controllers/static/auth.controller"));

var _express = _interopRequireDefault(require("express"));

var _isAuth = _interopRequireDefault(require("../../middlewares/isAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express["default"])();
router.get("/login", _auth["default"].getLoginPage);
router.post("/login", _auth["default"].login);
router.get("/logout", _auth["default"].logout);
router.get("/signup", _isAuth["default"], _auth["default"].getSignupPage);
router.post("/signup", _isAuth["default"], _auth["default"].signup);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=auth.route.js.map