import Fellowship from "../../models/fellowship.model";
import Department from "../../models/department.model";
import Member from "../../models/member.model";
import {
  validateMember,
  fellowshipExists,
  departmentExists
} from "../../helpers/validations";

class memberController {
  static async getAddMemberPage(req, res) {
    let departments = await Department.find();
    let fellowships = await Fellowship.find();
    let members = await Member.find()
      .populate("fellowship")
      .exec();

    res.render("admin/member-add", {
      departments: departments,
      fellowships: fellowships,
      members: members,
      title: "Member Page"
    });
  }

  static async saveMember(req, res) {
    let {
      firstname,
      lastname,
      email,
      phoneno,
      dob,
      gender,
      fellowship,
      department,
      firstTimeDate,
      foundationGraduationDate
    } = req.body;
    let newPhoneNo = phoneno.replace(/-/g, "");

    const { value, error } = validateMember(req.body);

    if (error) {
      let departments = await Department.find().exec();
      let fellowships = await Fellowship.find().exec();
      let members = await Member.find().populate("fellowship");

      return res.render("admin/member-add", {
        departments: departments,
        fellowships: fellowships,
        members: members,
        errorValues: value,
        error: error.details[0].message,
        title: "Member Page"
      });
    }

    const member = new Member({
      firstname: firstname,
      lastname: lastname,
      email: email,
      phonenumber: newPhoneNo,
      dob: dob,
      gender: gender
    });

    if (firstTimeDate) {
      member.firstTimeDate = firstTimeDate;
    } else {
      member.firstTimeDate = new Date();
    }

    if (foundationGraduationDate != "") {
      member.foundationGraduationDate = foundationGraduationDate;
    }

    if (fellowshipExists(fellowship)) member.fellowship = fellowship;
    if (departmentExists(department)) member.department = department;

    member.save();
    res.redirect("/admin/members");
  }
}

export default memberController;
