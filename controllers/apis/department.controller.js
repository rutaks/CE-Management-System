import Department from "../../models/department.model";
import Responses from "../../helpers/responses";

class departmentController {
  static createDepartment(req, res) {
    let { name } = req.body;
    Department.findOne({ name: name }).then(department => {
      if (department) {
        Responses.send409(res, "The Department already exist");
      } else {
        const department = new Department({ name: name });
        department
          .save()
          .then(result => {
            return Responses.send201(res, "Department Successfully Created", {
              department: department.name,
              createdOn: department.createdOn
            });
          })
          .catch(err => {
            return Responses.send404(res, err);
          });
      }
    });
  }

  static getDepartments(req, res) {
    Department.find().then(departments => {
      return Responses.send201(res, "Success", departments);
    });
  }
}

export default departmentController;
