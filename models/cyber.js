const mongoose = require("mongoose");
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
    },
    password: { type: String, required: true },
    shopRegistrationPhoto: { type: Buffer, default: "" },
    pancardPhoto: { type: Buffer, default: "" },
    adharcardPhoto: { type: Buffer, default: "" },
    passportSizePhoto: { type:Buffer , default: ""},
    imageMimetype: { type: String },
    createdBy: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

const cybercafe = mongoose.model("cybercafe", cybercafeSchema);
module.exports = cybercafe;
