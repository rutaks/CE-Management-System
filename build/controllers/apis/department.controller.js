"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _department2 = _interopRequireDefault(require("../../models/department.model"));

var _responses = _interopRequireDefault(require("../../helpers/responses"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var departmentController =
/*#__PURE__*/
function () {
  function departmentController() {
    _classCallCheck(this, departmentController);
  }

  _createClass(departmentController, null, [{
    key: "createDepartment",
    value: function createDepartment(req, res) {
      var name = req.body.name;

      _department2["default"].findOne({
        name: name
      }).then(function (department) {
        if (department) {
          _responses["default"].send409(res, "The Department already exist");
        } else {
          var _department = new _department2["default"]({
            name: name
          });

          _department.save().then(function (result) {
            return _responses["default"].send201(res, "Department Successfully Created", {
              department: _department.name,
              createdOn: _department.createdOn
            });
          })["catch"](function (err) {
            return _responses["default"].send404(res, err);
          });
        }
      });
    }
  }, {
    key: "getDepartments",
    value: function getDepartments(req, res) {
      _department2["default"].find().then(function (departments) {
        return _responses["default"].send201(res, "Success", departments);
      });
    }
  }]);

  return departmentController;
}();

var _default = departmentController;
exports["default"] = _default;
//# sourceMappingURL=department.controller.js.map