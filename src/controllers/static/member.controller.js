import Fellowship from "../../models/fellowship.model";
import Department from "../../models/department.model";
import Member from "../../models/member.model";

class memberController {
  //Displats Add Page
  static getAddMemberPage(req, res) {
    Department.find()
      .then(departments => {
        return departments;
      })
      .then(departments => {
        Fellowship.find()
          .then(fellowship => {
            return fellowship;
          })
          .then(fellowships => {
            Member.find()
              .populate("fellowship")
              .then(members => {
                res.render("admin/member-add", {
                  departments: departments,
                  fellowships: fellowships,
                  members: members,
                  title: "Member Page"
                });
              });
          });
      });
  }

  static saveMember(req, res) {
    let foundFellowship = null;
    let foundDepartment = null;
    let {
      firstname,
      lastname,
      email,
      phoneno,
      dob,
      gender,
      fellowship,
      department
    } = req.body;
    phoneno = phoneno.replace(/-/g, "");
    if (fellowship.match(/^[0-9a-fA-F]{24}$/)) {
      foundFellowship = Fellowship.findById(fellowship).exec();
    }

    if (department.match(/^[0-9a-fA-F]{24}$/)) {
      foundDepartment = Department.findById(department).exec();
    }
    const member = new Member({
      firstname: firstname,
      lastname: lastname,
      email: email,
      phonenumber: phoneno,
      dob: dob,
      gender: gender
    });
    if (foundFellowship) member.fellowship = fellowship;
    if (foundDepartment) member.department = department;
    member.save();
    res.redirect("/admin/members");
  }
}

export default memberController;
