import PartnershipPledge from "../models/partnership_pledge.model";
import formatter from "./formatters";

class searcher {
  static partnershipByDateSpan(start, end) {
    return PartnershipPledge.find({ createOn: { $gte: start, $lte: end } })
      .populate("member")
      .populate("partnership");
  }
  static partnershipByMember(member, start, end) {
    return PartnershipPledge.find({
      member: { _id: member },
      createOn: { $gte: start, $lte: end }
    })
      .populate("member")
      .populate("partnership");
  }
}

export default searcher;
