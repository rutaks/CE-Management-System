"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var formatter =
/*#__PURE__*/
function () {
  function formatter() {
    _classCallCheck(this, formatter);
  }

  _createClass(formatter, null, [{
    key: "getMomentCloudDate",
    value: function getMomentCloudDate(date) {
      return date.utcOffset("+0700").format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    }
  }, {
    key: "getMonthRange",
    value: function getMonthRange() {
      var start = "";
      var end = "";

      for (var _len = arguments.length, req = new Array(_len), _key = 0; _key < _len; _key++) {
        req[_key] = arguments[_key];
      }

      if (req == 0) {
        start = formatter.getMomentCloudDate((0, _moment["default"])().startOf("month"));
        end = formatter.getMomentCloudDate((0, _moment["default"])().endOf("month"));
      } else {
        start = formatter.getMomentCloudDate((0, _moment["default"])(req[0]));
        end = formatter.getMomentCloudDate((0, _moment["default"])(req[1]));
      }

      return {
        start: start,
        end: end
      };
    }
  }]);

  return formatter;
}();

var _default = formatter;
exports["default"] = _default;
//# sourceMappingURL=formatters.js.map