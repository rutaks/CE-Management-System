"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _account = _interopRequireDefault(require("../models/account.model"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var auth =
/*#__PURE__*/
function () {
  function auth() {
    _classCallCheck(this, auth);
  }

  _createClass(auth, null, [{
    key: "findAccount",
    value: function findAccount(username, password) {
      return _account["default"].findOne({
        username: username
      }).populate("member");
    }
  }, {
    key: "passwordIsValid",
    value: function passwordIsValid(password, hashPassword) {
      return _bcryptjs["default"].compareSync(password, hashPassword);
    }
  }]);

  return auth;
}();

var _default = auth;
exports["default"] = _default;
//# sourceMappingURL=auth.js.map