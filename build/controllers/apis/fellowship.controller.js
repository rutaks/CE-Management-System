"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fellowship2 = _interopRequireDefault(require("../../models/fellowship.model"));

var _responses = _interopRequireDefault(require("../../helpers/responses"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fellowshipController =
/*#__PURE__*/
function () {
  function fellowshipController() {
    _classCallCheck(this, fellowshipController);
  }

  _createClass(fellowshipController, null, [{
    key: "createFellowship",
    value: function createFellowship(req, res) {
      var name = req.body.name;

      _fellowship2["default"].findOne({
        name: name
      }).then(function (fellowship) {
        if (fellowship) {
          _responses["default"].send409(res, "The Fellowship already exist");
        } else {
          var _fellowship = new _fellowship2["default"]({
            name: name
          });

          _fellowship.save().then(function (result) {
            return _responses["default"].send201(res, "Fellowship Successfully Created", {
              fellowship: _fellowship.name,
              createdOn: _fellowship.createdOn
            });
          })["catch"](function (err) {
            return _responses["default"].send404(res, err);
          });
        }
      });
    }
  }, {
    key: "getFellowships",
    value: function getFellowships(req, res) {
      _fellowship2["default"].find().then(function (fellowships) {
        return _responses["default"].send201(res, "Success", fellowships);
      });
    }
  }]);

  return fellowshipController;
}();

var _default = fellowshipController;
exports["default"] = _default;
//# sourceMappingURL=fellowship.controller.js.map