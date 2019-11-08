import PartnershipPledge from "../../models/partnership_pledge.model";
import Partnership from "../../models/partnership.model";
import Member from "../../models/member.model";
import GivingCategory from "../../models/giving_category.model";
import Giving from "../../models/giving.model";
import formatter from "../../helpers/formatters";
import calculator from "../../helpers/calculator";
import searcher from "../../helpers/searchers";

import moment from "moment";

class PartnershipPledgeController {
  static getAddPartnershipPledgePage(req, res) {
    GivingCategory.find().then(givingCategories => {
      Member.find()
        .populate("fellowship")
        .then(members => {
          Partnership.find().then(partnerships => {
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

  static getDatedPartnershipPledges(req, res) {
    const datespan = req.body.datespan.trim().split(" - ");
    const { start, end } = formatter.getMonthRange(datespan[0], datespan[1]);
    searcher.partnershipByDateSpan(start, end).then(pledges => {
      const total = calculator.findTotal(pledges);
      res.status(201).render("admin/all-partnerships", {
        pledges: pledges,
        title: "All Partnership Pledges Record",
        startDate: new Date(start),
        endDate: new Date(end),
        totalAmount: total
      });
    });
  }

  static getPartnershipPledges(req, res) {
    const { start, end } = formatter.getMonthRange();
    searcher.partnershipByDateSpan(start, end).then(pledges => {
      const total = calculator.findTotal(pledges);
      res.status(201).render("admin/all-partnerships", {
        pledges: pledges,
        title: "All Partnership Pledges Record",
        startDate: new Date(start),
        endDate: new Date(end),
        totalAmount: total
      });
    });
  }

  static getGivings(req, res) {
    const { start, end } = formatter.getMonthRange();
    Giving.find({ createOn: { $gte: start, $lte: end } })
      .populate("member")
      .populate("giving")
      .then(pledges => {
        console.log(calculator.findTotal(pledges));
        res.status(201).render("admin/all-givings", {
          pledges: pledges,
          title: "All Giving Records"
        });
      });
  }

  static savePartnershipPledge(req, res) {
    let { partnership, member, amount } = req.body;
    const pledge = new PartnershipPledge({
      partnership: partnership,
      member: member,
      amount,
      amount
    });
    pledge
      .save()
      .then(result => res.redirect("/admin/pledges/partnerships"))
      .catch(err => {
        console.log(err);
      });
  }

  static saveGiving(req, res) {
    let { giving, member, amount } = req.body;
    const givings = new Giving({
      giving: giving,
      member: member,
      amount: amount
    });
    givings
      .save()
      .then(result => res.redirect("/admin/pledges/"))
      .catch(err => {
        console.log(err);
      });
  }
}

export default PartnershipPledgeController;
