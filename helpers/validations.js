import Joi from "@hapi/joi";

const memberValidation = member => {
  let Schema = Joi.object({
    firstname: Joi.string.required(),
    lastname: Joi.string.required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "rw", "fr"] }
    }),
    dob: Joi.date().greater("1-1-1974"),
    gender: Joi.string()
      .valid("MALE", "FEMALE")
      .uppercase()
      .required(),
    phonenumber: Joi.string()
      .trim()
      .regex(/^[0-9]{10}$/)
      .required()
  });
  return Schema.validate(member);
};

export { memberValidation };
