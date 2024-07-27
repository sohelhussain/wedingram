const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    gender: { type: String, required: true, enum: ["male", "female", "other"] },
    lookingFor: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    dob: { type: Date, required: true },
    category: { type: String, trim: true },
    education: { type: String, trim: true },
    country: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Please fill a valid phone number"],
    },
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
      },
    age: { type: Number, required: true, min: 18, max: 100 },
    maritalStatus: {
      type: String,
      enum: ["single", "married", "divorced", "widowed"],
    },
    address: { type: String, trim: true },
    fathersName: { type: String, trim: true },
    mothersName: { type: String, trim: true },
    disability: { type: String, trim: true },
    hobbies: { type: String, trim: true },
    caste: { type: String, trim: true },
    diet: { type: String, trim: true },
    complexion: { type: String, trim: true },
    drink: { type: String, enum: ["yes", "no", "occasionally"] },
    smoke: { type: String, enum: ["yes", "no", "occasionally"] },
    height: { type: String, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// ! Password hashing middleware
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// ! Password comparison method
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

const user = mongoose.model("user", userSchema);
module.exports = user;
