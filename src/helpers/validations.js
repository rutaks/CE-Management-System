import Joi from "@hapi/joi";
import Fellowship from "../models/fellowship.model";
import Department from "../models/department.model";

const fellowshipExists = fellowship => {
  let foundFellowship = null;
  if (fellowship.match(/^[0-9a-fA-F]{24}$/))
    foundFellowship = Fellowship.findById(fellowship).exec();
  return foundFellowship ? true : false;
};

const departmentExists = department => {
  let foundDepartment = null;
  if (department.match(/^[0-9a-fA-F]{24}$/))
    foundDepartment = Department.findById(department).exec();
  return foundDepartment ? true : false;
};

const validateMember = member => {
  member.phoneno = member.phoneno.replace(/-/g, "");
  console.log();

  let memberSchema = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    fellowship: Joi.string().allow(""),
    department: Joi.string().allow(""),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "rw", "fr"] }
    }),
    dob: Joi.date().greater("1-1-1974"),
    gender: Joi.string()
      .valid("MALE", "FEMALE")
      .uppercase()
      .required(),
    phoneno: Joi.string()
      .trim()
      .regex(/^[0-9]{10}$/)
      .required()
  });
  return memberSchema.validate(member);
};

export { validateMember, fellowshipExists, departmentExists };
