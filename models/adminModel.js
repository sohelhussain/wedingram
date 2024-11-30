const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
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
    role: {
       type: String, default: "admin", enum: ["admin", "superadmin"] 
      },
    verifiedCafes: [{ type: Schema.Types.ObjectId, ref: "Cybercafe" }],
  },
  { timestamps: true }
);



const admin = mongoose.model("admin", adminSchema);
module.exports.adminModel = admin;
