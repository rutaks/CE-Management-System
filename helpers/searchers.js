import PartnershipPledge from "../models/partnership_pledge.model";
import Partnership from "../models/partnership.model";
import Member from "../models/member.model";
import GivingCategory from "../models/giving_category.model";
import Giving from "../models/giving.model";
import formatter from "../helpers/formatters";

class searcher {
  static partnershipByDateSpan(start, end) {
    return PartnershipPledge.find({ createOn: { $gte: start, $lte: end } })
      .populate("member")
      .populate("partnership");
  }
}

export default searcher;
