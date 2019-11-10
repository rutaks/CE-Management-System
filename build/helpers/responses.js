"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var responses =
/*#__PURE__*/
function () {
  function responses() {
    _classCallCheck(this, responses);
  }

  _createClass(responses, null, [{
    key: "send201",
    value: function send201(res, msg, data) {
      res.status(201).json({
        status: 201,
        msg: msg,
        data: data
      });
    }
  }, {
    key: "send409",
    value: function send409(res, msg) {
      res.status(409).json({
        status: 409,
        error: msg
      });
    }
  }, {
    key: "send404",
    value: function send404(res, error) {
      res.status(404).json({
        status: 404,
        error: error
      });
    }
  }]);

  return responses;
}();

var _default = responses;
exports["default"] = _default;
//# sourceMappingURL=responses.js.map