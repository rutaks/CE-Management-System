"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var givingSchema = new Schema({
  giving: {
    type: Schema.Types.ObjectId,
    ref: "GivingCategory",
    required: true
  },
  member: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  createOn: {
    type: Date,
    "default": Date.now
  }
});

var _default = _mongoose["default"].model("Giving", givingSchema);

exports["default"] = _default;
//# sourceMappingURL=giving.model.js.map