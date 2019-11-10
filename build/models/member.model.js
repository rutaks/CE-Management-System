"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var memberSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  dob: {
    type: Date
  },
  gender: {
    type: String,
    "enum": ["Male", "Female"]
  },
  phonenumber: {
    type: String
  },
  fellowship: {
    type: Schema.Types.ObjectId,
    ref: "Fellowship",
    required: true
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true
  },
  createOn: {
    type: Date,
    "default": Date.now
  }
});

var _default = _mongoose["default"].model("Member", memberSchema);

exports["default"] = _default;
//# sourceMappingURL=member.model.js.map