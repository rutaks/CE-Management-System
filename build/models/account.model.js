"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var accountSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  member: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true
  },
  createOn: {
    type: Date,
    "default": Date.now
  }
});

var _default = _mongoose["default"].model("Account", accountSchema);

exports["default"] = _default;
//# sourceMappingURL=account.model.js.map