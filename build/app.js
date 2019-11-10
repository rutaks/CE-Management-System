"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _customEnv = _interopRequireDefault(require("custom-env"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongodb = _interopRequireDefault(require("mongodb"));

var _path = _interopRequireDefault(require("path"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongodbSession = _interopRequireDefault(require("connect-mongodb-session"));

var _connectFlash = _interopRequireDefault(require("connect-flash"));

var _api = _interopRequireDefault(require("./routes/api.routes"));

var _static = _interopRequireDefault(require("./routes/static.routes"));

var _account = _interopRequireDefault(require("./models/account.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = process.env.PORT || 3000; // const MongoDBStore = MongoDBSession(session);
// const store = new MongoDBStore({
//   uri: process.env.MONGODB_URI,
//   collection: "sessions"
// });

_customEnv["default"].env(); // store.on("error", function(error) {
//   console.log(error);
// });


app.set("view engine", "ejs");
app.set("views", "views");
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
app.use(_express["default"]["static"](_path["default"].join(__dirname, "../public")));
app.use((0, _connectFlash["default"])());
app.use((0, _expressSession["default"])({
  secret: "Long ID should be here",
  resave: false,
  saveUninitialized: false // store: store

}));
app.use(function (req, res, next) {
  if (!req.session.account) return next();

  _account["default"].findById(req.session.account._id).then(function (account) {
    req.acount = account;
    next();
  })["catch"](function (err) {
    console.log("ERR: Could not find User, " + err);
  });
});
app.use(function (req, res, next) {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.account = req.session.account;
  next();
});
app.use("/", _static["default"]);
app.use("/api", _api["default"]);

_mongoose["default"].connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function (result) {
  app.listen(port, function () {
    console.log("CE Management Server running on ".concat(port));
  });
})["catch"](function (err) {
  console.error("ERR: Could not connect to MongoDB, " + err);
});

var _default = app;
exports["default"] = _default;
//# sourceMappingURL=app.js.map