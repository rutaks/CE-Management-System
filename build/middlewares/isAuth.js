"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var isAuth = function isAuth(req, res, next) {
  if (!req.session.isLoggedIn) return res.redirect("/login");
  next();
};

var _default = isAuth;
exports["default"] = _default;
//# sourceMappingURL=isAuth.js.map