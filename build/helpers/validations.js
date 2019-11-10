"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memberValidation = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var memberValidation = function memberValidation(member) {
  var Schema = _joi["default"].object({
    firstname: _joi["default"].string.required(),
    lastname: _joi["default"].string.required(),
    email: _joi["default"].string().email({
      minDomainSegments: 2,
      tlds: {
        allow: ["com", "rw", "fr"]
      }
    }),
    dob: _joi["default"].date().greater("1-1-1974"),
    gender: _joi["default"].string().valid("MALE", "FEMALE").uppercase().required(),
    phonenumber: _joi["default"].string().trim().regex(/^[0-9]{10}$/).required()
  });

  return Schema.validate(member);
};

exports.memberValidation = memberValidation;
//# sourceMappingURL=validations.js.map