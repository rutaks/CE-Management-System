"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _department = _interopRequireDefault(require("../../controllers/apis/department.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = new _express["default"]();
router.get("/", _department["default"].getDepartments);
router.post("/", _department["default"].createDepartment);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=department.route.js.map