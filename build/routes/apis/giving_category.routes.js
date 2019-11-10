"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _giving_category = _interopRequireDefault(require("../../controllers/apis/giving_category.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express["default"])();
router.post("/", _giving_category["default"].createGivingCategory);
router.get("/", _giving_category["default"].getGivingCategories);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=giving_category.routes.js.map