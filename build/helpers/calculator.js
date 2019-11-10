"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var calculator =
/*#__PURE__*/
function () {
  function calculator() {
    _classCallCheck(this, calculator);
  }

  _createClass(calculator, null, [{
    key: "findTotal",
    value: function findTotal(array) {
      var tot = 0;
      array.forEach(function (element) {
        tot += element.amount;
      });
      return tot;
    }
  }]);

  return calculator;
}();

var _default = calculator;
exports["default"] = _default;
//# sourceMappingURL=calculator.js.map