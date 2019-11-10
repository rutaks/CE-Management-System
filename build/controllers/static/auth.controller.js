"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _account = _interopRequireDefault(require("../../models/account.model"));

var _auth = _interopRequireDefault(require("../../helpers/auth"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _member = _interopRequireDefault(require("./member.controller"));

var _member2 = _interopRequireDefault(require("../../models/member.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var authController =
/*#__PURE__*/
function () {
  function authController() {
    _classCallCheck(this, authController);
  }

  _createClass(authController, null, [{
    key: "getLoginPage",
    value: function getLoginPage(req, res) {
      res.render("auth/login", {
        title: "Login"
      });
    }
  }, {
    key: "getSignupPage",
    value: function getSignupPage(req, res) {
      _member2["default"].find().then(function (members) {
        return res.render("auth/register", {
          title: "Register Account",
          members: members
        });
      });
    }
  }, {
    key: "signup",
    value: function signup(req, res) {
      var _req$body = req.body,
          member = _req$body.member,
          username = _req$body.username,
          password = _req$body.password,
          confirmPassword = _req$body.confirmPassword;

      _account["default"].findOne({
        username: username
      }).then(function (userDoc) {
        if (userDoc) {
          req.flash("error", "Username is used by another user");
          return res.redirect("signup");
        }

        return _bcryptjs["default"].hash(password, 12).then(function (hashedPassword) {
          var account = new _account["default"]({
            username: username,
            member: member,
            password: hashedPassword
          });
          return account.save();
        });
      }).then(function (result) {
        return res.redirect("/login");
      })["catch"](function (err) {
        return console.log("ERR: Could not signup user, " + user);
      });
    }
  }, {
    key: "login",
    value: function login(req, res) {
      var _req$body2 = req.body,
          username = _req$body2.username,
          password = _req$body2.password;

      var account = _auth["default"].findAccount(username);

      account.then(function (acc) {
        if (_auth["default"].passwordIsValid(password, acc.password)) {
          req.session.isLoggedIn = true;
          req.session.account = acc.member.firstname + " " + acc.member.lastname;
          return res.redirect("/admin");
        } else {
          return res.render("auth/login", {
            errorMessage: "Invalid Username or Password",
            oldInput: {
              email: username
            }
          });
        }
      });
    }
  }, {
    key: "logout",
    value: function logout(req, res) {
      req.session.destroy(function (err) {
        res.redirect("/login");
      });
    }
  }]);

  return authController;
}();

var _default = authController;
exports["default"] = _default;
//# sourceMappingURL=auth.controller.js.map