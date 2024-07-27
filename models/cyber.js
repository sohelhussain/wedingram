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
    shopRegistrationPhoto: { type: String, required: true },
    pancardPhoto: { type: String, required: true },
    adharcardPhoto: { type: String, required: true },
    passportSizePhoto: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const cybercafe = mongoose.model("cybercafe", cybercafeSchema);
module.exports = cybercafe;
