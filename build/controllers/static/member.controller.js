"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fellowship = _interopRequireDefault(require("../../models/fellowship.model"));

var _department = _interopRequireDefault(require("../../models/department.model"));

var _member = _interopRequireDefault(require("../../models/member.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var memberController =
/*#__PURE__*/
function () {
  function memberController() {
    _classCallCheck(this, memberController);
  }

  _createClass(memberController, null, [{
    key: "getAddMemberPage",
    //Displats Add Page
    value: function getAddMemberPage(req, res) {
      _department["default"].find().then(function (departments) {
        return departments;
      }).then(function (departments) {
        _fellowship["default"].find().then(function (fellowship) {
          return fellowship;
        }).then(function (fellowships) {
          _member["default"].find().populate("fellowship").then(function (members) {
            res.render("admin/member-add", {
              departments: departments,
              fellowships: fellowships,
              members: members,
              title: "Member Page"
            });
          });
        });
      });
    }
  }, {
    key: "saveMember",
    value: function saveMember(req, res) {
      var _req$body = req.body,
          firstname = _req$body.firstname,
          lastname = _req$body.lastname,
          email = _req$body.email,
          phoneno = _req$body.phoneno,
          dob = _req$body.dob,
          gender = _req$body.gender,
          fellowship = _req$body.fellowship,
          department = _req$body.department;
      phoneno = phoneno.replace(/-/g, "");

      _fellowship["default"].findById(fellowship).then(function (fellowship) {
        var member = new _member["default"]({
          firstname: firstname,
          lastname: lastname,
          email: email,
          phonenumber: phoneno,
          dob: dob,
          gender: gender,
          fellowship: fellowship,
          department: department
        });
        member.save();
        res.redirect("/admin/members");
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }]);

  return memberController;
}();

var _default = memberController;
exports["default"] = _default;
//# sourceMappingURL=member.controller.js.map