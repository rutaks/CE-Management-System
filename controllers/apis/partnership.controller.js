import PartnershipArm from "../../models/partnership.model";
import Responses from "../../helpers/responses";

class partnershipArmController {
  static createPartnership(req, res) {
    let { name } = req.body;
    PartnershipArm.findOne({ name: name }).then(partnershipArm => {
      if (!partnershipArm) {
        const partnership = new PartnershipArm({ name: name });
        partnership
          .save()
          .then(result => {
            return Responses.send201(res, "Partnership Successfully Created", {
              partnership: partnership.name,
              createdOn: partnership.createdOn
            });
          })
          .catch(err => {
            return Responses.send404(res, err);
          });
      }
    });
  }
  static getPartnerships(req, res) {
    PartnershipArm.find().then(partnershipArm => {
      return Responses.send201(res, "Success", partnershipArm);
    });
  }
}

export default partnershipArmController;
