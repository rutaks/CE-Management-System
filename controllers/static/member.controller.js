import Fellowship from "../../models/fellowship.model";
import Member from "../../models/member.model";

class memberController {
  //Displats Add Page
  static getAddMemberPage(req, res) {
    Fellowship.find()
      .then(fellowship => {
        return fellowship;
      })
      .then(fellowships => {
        Member.find()
          .populate("fellowship")
          .then(members => {
            res.render("admin/member-add", {
              fellowships: fellowships,
              members: members,
              title: "Add Member"
            });
          });
      });
  }

  static saveMember(req, res) {
    let {
      firstname,
      lastname,
      email,
      phoneno,
      dob,
      gender,
      fellowship
    } = req.body;
    phoneno = phoneno.replace(/-/g, "");
    Fellowship.findById(fellowship)
      .then(fellowship => {
        const member = new Member({
          firstname: firstname,
          lastname: lastname,
          email: email,
          phonenumber: phoneno,
          dob: dob,
          gender: gender,
          fellowship: fellowship
        });
        member.save();
        res.redirect("/admin/members");
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default memberController;
