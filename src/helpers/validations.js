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

const validatePartnership = partnershipSubmission => {
  let partnershipSubmissionSchema = Joi.object({
    partnership: Joi.string().required(),
    member: Joi.string().required(),
    amount: Joi.number().required(),
    currency: Joi.string()
      .valid("RWF", "USD")
      .required(),
    currencyRate: Joi.number().allow(""),
    createOn: Joi.date().allow("")
  }).unknown(true);

  return partnershipSubmissionSchema.validate(partnershipSubmission);
};

const validateMember = member => {
  member.phoneno = member.phoneno.replace(/-/g, "");
  let memberSchema = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    fellowship: Joi.string().allow(""),
    department: Joi.string().allow(""),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "rw", "fr"] }
      })
      .allow(""),
    dob: Joi.date()
      .greater("1-1-1974")
      .allow(""),
    foundationGraduationDate: Joi.date()
      .greater("1-1-1974")
      .allow(""),
    firstTimeDate: Joi.date()
      .greater("1-1-1974")
      .allow(""),
    gender: Joi.string()
      .valid("MALE", "FEMALE")
      .uppercase()
      .required(),
    phoneno: Joi.string()
      .trim()
      .regex(/^[0-9]{10}$/)
      .allow("")
  });
  return memberSchema.validate(member);
};

export {
  validateMember,
  fellowshipExists,
  departmentExists,
  validatePartnership
};
