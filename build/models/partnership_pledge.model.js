"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var partnershipPledgeSchema = new Schema({
  partnership: {
    type: Schema.Types.ObjectId,
    ref: "PartnershipArm",
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

var _default = _mongoose["default"].model("PartnershipPledge", partnershipPledgeSchema);

exports["default"] = _default;
//# sourceMappingURL=partnership_pledge.model.js.map