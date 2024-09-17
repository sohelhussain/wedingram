const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    gender: { type: String, enum: ["male", "female", "other"] },
    lookingFor: {
      type: String,

      enum: ["male", "female", "other"],
    },
    dob: { type: Date },
    category: { type: String, trim: true },
    education: { type: String, trim: true },
    country: { type: String, trim: true },
    state: { type: String, trim: true },
    city: { type: String, trim: true },
    phoneNumber: {
      type: String,

      unique: true,
      match: [/^\d{10}$/, "Please fill a valid phone number"],
    },
    email: {
      type: String,
      minlength: 2,
      maxlength: 50,

      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    age: { type: Number, min: 18, max: 100 },
    maritalStatus: {
      type: String,
      enum: ["single", "married", "divorced", "widowed"],
    },
    district: { type: String, trim: true },
    block: { type: String, trim: true },
    panchayt: { type: String, trim: true },
    village: { type: String, trim: true },
    fathersName: { type: String, trim: true },
    mothersName: { type: String, trim: true },
    disability: { type: String, trim: true },
    hobbies: { type: String, trim: true },
    caste: { type: String, trim: true },
    role: { type: String, required: true, enum: ['user'], default: 'user' },
    diet: { type: String, trim: true },
    complexion: { type: String, trim: true },
    drink: { type: String, enum: ["yes", "no", "occasionally"] },
    smoke: { type: String, enum: ["yes", "no", "occasionally"] },
    height: { type: String, trim: true },
    password: { type: String },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);
module.exports = user;