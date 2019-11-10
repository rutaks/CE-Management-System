"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var givingCategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    "default": Date.now
  }
});

var _default = _mongoose["default"].model("GivingCategory", givingCategorySchema);

exports["default"] = _default;
//# sourceMappingURL=giving_category.model.js.map