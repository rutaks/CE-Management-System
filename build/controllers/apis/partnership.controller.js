"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _partnership = _interopRequireDefault(require("../../models/partnership.model"));

var _responses = _interopRequireDefault(require("../../helpers/responses"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var partnershipArmController =
/*#__PURE__*/
function () {
  function partnershipArmController() {
    _classCallCheck(this, partnershipArmController);
  }

  _createClass(partnershipArmController, null, [{
    key: "createPartnership",
    value: function createPartnership(req, res) {
      var name = req.body.name;

      _partnership["default"].findOne({
        name: name
      }).then(function (partnershipArm) {
        if (!partnershipArm) {
          var partnership = new _partnership["default"]({
            name: name
          });
          partnership.save().then(function (result) {
            return _responses["default"].send201(res, "Partnership Successfully Created", {
              partnership: partnership.name,
              createdOn: partnership.createdOn
            });
          })["catch"](function (err) {
            return _responses["default"].send404(res, err);
          });
        }
      });
    }
  }, {
    key: "getPartnerships",
    value: function getPartnerships(req, res) {
      _partnership["default"].find().then(function (partnershipArm) {
        return _responses["default"].send201(res, "Success", partnershipArm);
      });
    }
  }]);

  return partnershipArmController;
}();

var _default = partnershipArmController;
exports["default"] = _default;
//# sourceMappingURL=partnership.controller.js.map