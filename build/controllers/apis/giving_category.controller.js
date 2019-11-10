"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _giving_category = _interopRequireDefault(require("../../models/giving_category.model"));

var _responses = _interopRequireDefault(require("../../helpers/responses"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var givingCategoryController =
/*#__PURE__*/
function () {
  function givingCategoryController() {
    _classCallCheck(this, givingCategoryController);
  }

  _createClass(givingCategoryController, null, [{
    key: "createGivingCategory",
    value: function createGivingCategory(req, res) {
      var name = req.body.name;

      _giving_category["default"].findOne({
        name: name
      }).then(function (givingCategory) {
        if (!givingCategory) {
          var giving = new _giving_category["default"]({
            name: name
          });
          giving.save().then(function (result) {
            return _responses["default"].send201(res, "Giving Category Successfully Created", {
              giving: giving.name,
              createdOn: giving.createdOn
            });
          })["catch"](function (err) {
            return _responses["default"].send404(res, err);
          });
        }
      });
    }
  }, {
    key: "getGivingCategories",
    value: function getGivingCategories(req, res) {
      _giving_category["default"].find().then(function (givingCategory) {
        return _responses["default"].send201(res, "Success", givingCategory);
      });
    }
  }]);

  return givingCategoryController;
}();

var _default = givingCategoryController;
exports["default"] = _default;
//# sourceMappingURL=giving_category.controller.js.map