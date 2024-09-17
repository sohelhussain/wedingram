const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;
const cybercafeSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      role: { type: String, required: true, enum: ['cyber'], default: 'cyber' },
    },
  password: { type: String, required: true, select: false },
  shopRegistrationPhoto: { type: Buffer, default: "" },
  shopRegistrationPhotoMimetype: { type: String, default: "" },
  pancardPhoto: { type: Buffer, default: "" },
  pancardPhotoMimetype: { type: String, default: "" },
  adharcardPhoto: { type: Buffer, default: "" },
  adharcardPhotoMimetype: { type: String, default: "" },
  passportSizePhoto: { type: Buffer, default: "" },
  passportSizePhotoMimetype: { type: String, default: "" },
  role:{type: String, default: 'cyber'},
  createdBy: [{ type: Schema.Types.ObjectId, ref: "user" }]

  },
  { timestamps: true }
);


function cybervalidate(data) {
  const cybercafeSchemaJoi = Joi.object({
    name: Joi.string().min(2).max(50).trim().required().messages({
      "string.base": "Name should be a type of 'text'",
      "string.empty": "Name cannot be an empty field",
      "string.min": "Name should have a minimum length of {#limit}",
      "string.max": "Name should have a maximum length of {#limit}",
      "any.required": "Name is required",
    }),
    email: Joi.string()
      .trim()
      .lowercase()
      .email({ minDomainSegments: 2, tlds: { allow: true } })
      .required()
      .messages({
        "string.base": "Email should be a type of 'text'",
        "string.empty": "Email cannot be an empty field",
        "string.email": "Please fill a valid email address",
        "any.required": "Email is required",
      }),
    password: Joi.string().min(6).max(100).required().messages({
      "string.base": "Password should be a type of 'text'",
      "string.empty": "Password cannot be an empty field",
      "string.min": "Password should have a minimum length of {#limit}",
      "string.max": "Password should have a maximum length of {#limit}",
      "any.required": "Password is required",
    }),
    shopRegistrationPhoto: Joi.array()
      .items(
        Joi.object({
          fieldname: Joi.string(),
          originalname: Joi.string(),
          encoding: Joi.string(),
          mimetype: Joi.string().required(),
          buffer: Joi.binary().required(),
          size: Joi.number()
        })
      )
      .allow(null),
    pancardPhoto: Joi.array()
      .items(
        Joi.object({
          fieldname: Joi.string(),
          originalname: Joi.string(),
          encoding: Joi.string(),
          mimetype: Joi.string().required(),
          buffer: Joi.binary().required(),
          size: Joi.number()
        })
      )
      .allow(null),
    adharcardPhoto: Joi.array()
      .items(
        Joi.object({
          fieldname: Joi.string(),
          originalname: Joi.string(),
          encoding: Joi.string(),
          mimetype: Joi.string().required(),
          buffer: Joi.binary().required(),
          size: Joi.number()
        })
      )
      .allow(null),
    passportSizePhoto: Joi.array()
      .items(
        Joi.object({
          fieldname: Joi.string(),
          originalname: Joi.string(),
          encoding: Joi.string(),
          mimetype: Joi.string().required(),
          buffer: Joi.binary().required(),
          size: Joi.number()
        })
      )
      .allow(null),
    createdBy: Joi.array()
      .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
      .messages({
        "string.pattern.base": "Invalid ObjectId format for createdBy",
      }),
  });

  const { error } = cybercafeSchemaJoi.validate(data);
  return error;
}





const cybercafe = mongoose.model("cybercafe", cybercafeSchema);
module.exports.cyberModel = cybercafe;
module.exports.cyberValidator = cybervalidate;
