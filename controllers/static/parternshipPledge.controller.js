import PartnershipPledge from "../../models/partnership_pledge.model";
import Partnership from "../../models/partnership.model";
import Member from "../../models/member.model";
import GivingCategory from "../../models/giving_category.model";
import Giving from "../../models/giving.model";
import formatter from "../../helpers/formatters";
import calculator from "../../helpers/calculator";

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

  static getPartnershipPledges(req, res) {
    const start = formatter.getMomentCloudDate(moment().startOf("month"));
    const end = formatter.getMomentCloudDate(moment().endOf("month"));
    PartnershipPledge.find({
      createOn: { $gte: start, $lte: end }
    })
      .populate("member")
      .populate("partnership")
      .then(pledges => {
        console.log(calculator.findTotal(pledges));
        res.status(201).render("admin/all-partnerships", {
          pledges: pledges,
          title: "All Partnership Pledges Record"
        });
      });
  }

  static getGivings(req, res) {
    let startdate = new Date(2019, 11, 2);
    let enddate = new Date(2012, 11, 5);
    Giving.find()
      .populate("member")
      .populate("giving")
      .then(pledges => {
        pledges.forEach(val => {
          if (val.createOn === startdate) console.log(pledges);
        });

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
