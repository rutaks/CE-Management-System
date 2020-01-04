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
import ErrorHandler from "../../helpers/error-handler";

class FinanceController {
  static async getAddPartnershipPledgePage(req, res) {
    try {
      const givingCategories = await GivingCategory.find();
      const partnerships = await Partnership.find();
      const members = await Member.find().populate("fellowship");

      res.status(201).render("admin/pledges-add", {
        partnerships: partnerships,
        members: members,
        givingCategories: givingCategories,
        title: "Pledges"
      });
    } catch (error) {
      console.log(error);
      throw new ErrorHandler(500, error);
    }
  }

  static async getDatedPartnershipPledges(req, res) {
    try {
      let { datespan, currency, partnershipArm } = req.body;
      datespan = datespan.trim().split(" - ");

      const { start, end } = formatter.getMonthRange(datespan[0], datespan[1]);
      const partnershipArms = await Partnership.find();
      const pledges = await searcher.partnershipByDateSpan(
        start,
        end,
        partnershipArm,
        currency
      );

      const { usdTot, rwfTot } = calculator.findTotal(pledges, currency);

      res.status(201).render("admin/all-partnerships", {
        pledges: pledges,
        title: "All Partnership Record",
        startDate: new Date(start),
        endDate: new Date(end),
        totalAmountRwf: rwfTot,
        totalAmountUsd: usdTot,
        partnershipArms: partnershipArms
      });
    } catch (error) {
      console.log(error);
      throw new ErrorHandler(500, error);
    }
  }

  static async getMemberPartnerships(req, res) {
    const { start, end } = formatter.getMonthRange();
    const memberId = req.params.memberId;
    const currency = req.params.currency;
    try {
      const pledges = await searcher.partnershipByMember(memberId, start, end);
      const { usdTot, rwfTot } = calculator.findTotal(pledges, currency);
      const memberName = `${pledges[0].member.firstname} ${pledges[0].member.lastname}`;

      res.status(201).render("admin/member-partnerships", {
        pledges: pledges,
        title: `${memberName}'s Partnership Record`,
        startDate: new Date(start),
        endDate: new Date(end),
        totalAmountRwf: rwfTot,
        totalAmountUsd: usdTot
      });
    } catch (error) {
      console.log(error);
      throw new ErrorHandler(500, error);
    }
  }

  static async getPartnershipPledges(req, res) {
    try {
      const partnershipArms = await Partnership.find();
      const { start, end } = formatter.getMonthRange();
      const pledges = await searcher.partnershipByDateSpan(start, end, "", "");
      const { usdTot, rwfTot } = calculator.findTotal(pledges, "");

      res.status(201).render("admin/all-partnerships", {
        pledges: pledges,
        title: "All Partnership Pledges Record",
        startDate: new Date(start),
        endDate: new Date(end),
        totalAmountRwf: rwfTot,
        totalAmountUsd: usdTot,
        partnershipArms: partnershipArms
      });
    } catch (error) {
      console.log(error);
      throw new ErrorHandler(500, error);
    }
  }

  static async getGivings(req, res) {
    try {
      const { start, end } = formatter.getMonthRange();
      const pledges = await Giving.find({
        createOn: { $gte: start, $lte: end }
      })
        .populate("member")
        .populate("giving");

      res.status(201).render("admin/all-givings", {
        pledges: pledges,
        title: "All Giving Records"
      });
    } catch (error) {
      console.log(error);
      throw new ErrorHandler(500, error);
    }
  }

  static async savePartnershipPledge(req, res) {
    const { value, error } = validatePartnership(req.body);

    try {
      if (error) {
        const partnershipArms = await Partnership.find();
        const givingCategories = await GivingCategory.find();
        const members = await Member.find().populate("fellowship");

        return res.status(201).render("admin/pledges-add", {
          partnerships: partnershipArms,
          members: members,
          givingCategories: givingCategories,
          errorValues: value,
          error: error.details[0].message
        });
      }

      if (value.createOn.length < 1) delete value.createOn;
      value.recordedBy = req.session.account;

      const pledge = new PartnershipPledge(value);

      await pledge.save();
      res.redirect("/admin/finances");
    } catch (error) {
      console.log(error);
      throw new ErrorHandler(500, error);
    }
  }

  static saveGiving(req, res) {
    let { giving, member, amount } = req.body;
    try {
      const givings = new Giving({
        giving: giving,
        member: member,
        amount: amount
      });
      givings.save();
      res.redirect("/admin/finances/");
    } catch (error) {
      console.log(error);
      throw new ErrorHandler(500, error);
    }
  }
}

export default FinanceController;
