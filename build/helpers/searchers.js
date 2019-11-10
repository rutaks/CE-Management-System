"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _partnership_pledge = _interopRequireDefault(require("../models/partnership_pledge.model"));

var _formatters = _interopRequireDefault(require("./formatters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var searcher =
/*#__PURE__*/
function () {
  function searcher() {
    _classCallCheck(this, searcher);
  }

  _createClass(searcher, null, [{
    key: "partnershipByDateSpan",
    value: function partnershipByDateSpan(start, end) {
      return _partnership_pledge["default"].find({
        createOn: {
          $gte: start,
          $lte: end
        }
      }).populate("member").populate("partnership");
    }
  }, {
    key: "partnershipByMember",
    value: function partnershipByMember(member, start, end) {
      return _partnership_pledge["default"].find({
        member: {
          _id: member
        },
        createOn: {
          $gte: start,
          $lte: end
        }
      }).populate("member").populate("partnership");
    }
  }]);

  return searcher;
}();

var _default = searcher;
exports["default"] = _default;
//# sourceMappingURL=searchers.js.map