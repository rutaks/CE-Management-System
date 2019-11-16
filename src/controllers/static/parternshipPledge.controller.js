//MODELS
import PartnershipPledge from "../../models/partnership_pledge.model";
import Partnership from "../../models/partnership.model";
import Member from "../../models/member.model";
import GivingCategory from "../../models/giving_category.model";
import Giving from "../../models/giving.model";
//HELPERS
import formatter from "../../helpers/formatters";
import calculator from "../../helpers/calculator";
import searcher from "../../helpers/searchers";
import { validatePartnership } from "../../helpers/validations";
//OTHERS
import moment from "moment";

class PartnershipPledgeController {
  static async getAddPartnershipPledgePage(req, res) {
    const givingCategories = await GivingCategory.find().exec();
    const partnerships = await Partnership.find().exec();
    const members = await Member.find()
      .populate("fellowship")
      .exec();
    res.status(201).render("admin/pledges-add", {
      partnerships: partnerships,
      members: members,
      givingCategories: givingCategories,
      title: "Pledges"
    });
  }

  static getDatedPartnershipPledges(req, res) {
    const datespan = req.body.datespan.trim().split(" - ");
    const { start, end } = formatter.getMonthRange(datespan[0], datespan[1]);
    searcher.partnershipByDateSpan(start, end).then(pledges => {
      const total = calculator.findTotal(pledges);
      res.status(201).render("admin/all-partnerships", {
        pledges: pledges,
        title: "All Partnership Record",
        startDate: new Date(start),
        endDate: new Date(end),
        totalAmount: total
      });
    });
  }

  static getMemberPartnerships(req, res) {
    const { start, end } = formatter.getMonthRange();
    const memberId = req.params.memberId;
    searcher.partnershipByMember(memberId, start, end).then(pledges => {
      const total = calculator.findTotal(pledges);
      res.status(201).render("admin/member-partnerships", {
        pledges: pledges,
        title:
          "Partnership Record Of " +
          pledges[0].member.firstname +
          " " +
          pledges[0].member.lastname,
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
    const { value, error } = validatePartnership(req.body);

    if (error) {
      const { start, end } = formatter.getMonthRange();
      searcher.partnershipByDateSpan(start, end).then(pledges => {
        const total = calculator.findTotal(pledges);
        res.status(201).render("admin/all-partnerships", {
          pledges: pledges,
          title: "All Partnership Pledges Record",
          startDate: new Date(start),
          endDate: new Date(end),
          totalAmount: total,
          errorValues: value,
          error: error.details[0].message
        });
      });
    }
    const pledge = new PartnershipPledge({
      partnership: partnership,
      member: member,
      amount,
      amount
    });
    pledge
      .save()
      .then(result => res.redirect("/admin/pledges"))
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
