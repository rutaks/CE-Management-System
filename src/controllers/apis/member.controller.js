import Member from "../../models/member.model";
import Fellowship from "../../models/fellowship.model";
import Responses from "../../helpers/responses";

class memberController {
  static createMember(req, res) {
    let {
      firstname,
      lastname,
      dob,
      gender,
      phonenumber,
      fellowshipname
    } = req.body;
    Fellowship.findOne({ name: fellowshipname }).then(fellowship => {
      if (fellowship) {
        const member = new Member({
          firstname: firstname,
          lastname: lastname,
          dob: dob,
          phonenumber: phonenumber,
          gender: gender,
          fellowshipId: fellowship._id
        });
        member
          .save()
          .then(res => {
            return Responses.send201(res, "Member Successfully Created", {
              member: {
                firstname: member.firstname,
                lastname: member.lastname
              },
              createdOn: member.createdOn
            });
          })
          .catch(err => {
            return Responses.send404(res, err);
          });
      }
    });
  }
}

export default memberController;
