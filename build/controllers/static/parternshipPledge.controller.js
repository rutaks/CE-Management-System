"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _partnership_pledge = _interopRequireDefault(require("../../models/partnership_pledge.model"));

var _partnership = _interopRequireDefault(require("../../models/partnership.model"));

var _member = _interopRequireDefault(require("../../models/member.model"));

var _giving_category = _interopRequireDefault(require("../../models/giving_category.model"));

var _giving = _interopRequireDefault(require("../../models/giving.model"));

var _formatters = _interopRequireDefault(require("../../helpers/formatters"));

var _calculator = _interopRequireDefault(require("../../helpers/calculator"));

var _searchers = _interopRequireDefault(require("../../helpers/searchers"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PartnershipPledgeController =
/*#__PURE__*/
function () {
  function PartnershipPledgeController() {
    _classCallCheck(this, PartnershipPledgeController);
  }

  _createClass(PartnershipPledgeController, null, [{
    key: "getAddPartnershipPledgePage",
    value: function getAddPartnershipPledgePage(req, res) {
      _giving_category["default"].find().then(function (givingCategories) {
        _member["default"].find().populate("fellowship").then(function (members) {
          _partnership["default"].find().then(function (partnerships) {
            res.status(201).render("admin/pledges-add", {
              partnerships: partnerships,
              members: members,
              givingCategories: givingCategories,
              title: "Pledges"
            });
          });
        });
      });
    }
  }, {
    key: "getDatedPartnershipPledges",
    value: function getDatedPartnershipPledges(req, res) {
      var datespan = req.body.datespan.trim().split(" - ");

      var _formatter$getMonthRa = _formatters["default"].getMonthRange(datespan[0], datespan[1]),
          start = _formatter$getMonthRa.start,
          end = _formatter$getMonthRa.end;

      _searchers["default"].partnershipByDateSpan(start, end).then(function (pledges) {
        var total = _calculator["default"].findTotal(pledges);

        res.status(201).render("admin/all-partnerships", {
          pledges: pledges,
          title: "All Partnership Record",
          startDate: new Date(start),
          endDate: new Date(end),
          totalAmount: total
        });
      });
    }
  }, {
    key: "getMemberPartnerships",
    value: function getMemberPartnerships(req, res) {
      var _formatter$getMonthRa2 = _formatters["default"].getMonthRange(),
          start = _formatter$getMonthRa2.start,
          end = _formatter$getMonthRa2.end;

      var memberId = req.params.memberId;

      _searchers["default"].partnershipByMember(memberId, start, end).then(function (pledges) {
        var total = _calculator["default"].findTotal(pledges);

        res.status(201).render("admin/member-partnerships", {
          pledges: pledges,
          title: "Partnership Record Of " + pledges[0].member.firstname + " " + pledges[0].member.lastname,
          startDate: new Date(start),
          endDate: new Date(end),
          totalAmount: total
        });
      });
    }
  }, {
    key: "getPartnershipPledges",
    value: function getPartnershipPledges(req, res) {
      var _formatter$getMonthRa3 = _formatters["default"].getMonthRange(),
          start = _formatter$getMonthRa3.start,
          end = _formatter$getMonthRa3.end;

      _searchers["default"].partnershipByDateSpan(start, end).then(function (pledges) {
        var total = _calculator["default"].findTotal(pledges);

        res.status(201).render("admin/all-partnerships", {
          pledges: pledges,
          title: "All Partnership Pledges Record",
          startDate: new Date(start),
          endDate: new Date(end),
          totalAmount: total
        });
      });
    }
  }, {
    key: "getGivings",
    value: function getGivings(req, res) {
      var _formatter$getMonthRa4 = _formatters["default"].getMonthRange(),
          start = _formatter$getMonthRa4.start,
          end = _formatter$getMonthRa4.end;

      _giving["default"].find({
        createOn: {
          $gte: start,
          $lte: end
        }
      }).populate("member").populate("giving").then(function (pledges) {
        console.log(_calculator["default"].findTotal(pledges));
        res.status(201).render("admin/all-givings", {
          pledges: pledges,
          title: "All Giving Records"
        });
      });
    }
  }, {
    key: "savePartnershipPledge",
    value: function savePartnershipPledge(req, res) {
      var _req$body = req.body,
          partnership = _req$body.partnership,
          member = _req$body.member,
          amount = _req$body.amount;
      var pledge = new _partnership_pledge["default"](_defineProperty({
        partnership: partnership,
        member: member,
        amount: amount
      }, "amount", amount));
      pledge.save().then(function (result) {
        return res.redirect("/admin/pledges/partnerships");
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }, {
    key: "saveGiving",
    value: function saveGiving(req, res) {
      var _req$body2 = req.body,
          giving = _req$body2.giving,
          member = _req$body2.member,
          amount = _req$body2.amount;
      var givings = new _giving["default"]({
        giving: giving,
        member: member,
        amount: amount
      });
      givings.save().then(function (result) {
        return res.redirect("/admin/pledges/");
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }]);

  return PartnershipPledgeController;
}();

var _default = PartnershipPledgeController;
exports["default"] = _default;
//# sourceMappingURL=parternshipPledge.controller.js.map