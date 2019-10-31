import PartnershipPledge from "../../models/partnership_pledge.model";
import Partnership from "../../models/partnership.model";
import Member from "../../models/member.model";

class PartnershipPledgeController {
  static getAddPartnershipPledgePage(req, res) {
    Member.find()
      .populate("fellowship")
      .then(members => {
        Partnership.find().then(partnerships => {
          res.status(201).render("admin/pledges-add", {
            partnerships: partnerships,
            members: members,
            title: "Pledges"
          });
        });
      });
  }

  static getPartnershipPledges(req, res) {
    PartnershipPledge.find()
      .populate("member")
      .populate("partnership")
      .then(pledges => {
        res.status(201).render("admin/pledges", {
          pledges: pledges,
          title: "Pledges"
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
}

export default PartnershipPledgeController;
