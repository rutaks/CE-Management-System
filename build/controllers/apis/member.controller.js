"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _member = _interopRequireDefault(require("../../models/member.model"));

var _fellowship = _interopRequireDefault(require("../../models/fellowship.model"));

var _responses = _interopRequireDefault(require("../../helpers/responses"));

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
    key: "createMember",
    value: function createMember(req, res) {
      var _req$body = req.body,
          firstname = _req$body.firstname,
          lastname = _req$body.lastname,
          dob = _req$body.dob,
          gender = _req$body.gender,
          phonenumber = _req$body.phonenumber,
          fellowshipname = _req$body.fellowshipname;

      _fellowship["default"].findOne({
        name: fellowshipname
      }).then(function (fellowship) {
        if (fellowship) {
          var member = new _member["default"]({
            firstname: firstname,
            lastname: lastname,
            dob: dob,
            phonenumber: phonenumber,
            gender: gender,
            fellowshipId: fellowship._id
          });
          member.save().then(function (res) {
            return _responses["default"].send201(res, "Member Successfully Created", {
              member: {
                firstname: member.firstname,
                lastname: member.lastname
              },
              createdOn: member.createdOn
            });
          })["catch"](function (err) {
            return _responses["default"].send404(res, err);
          });
        }
      });
    }
  }]);

  return memberController;
}();

var _default = memberController;
exports["default"] = _default;
//# sourceMappingURL=member.controller.js.map