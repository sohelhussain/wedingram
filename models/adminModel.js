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

// ! Password hashing middleware
// adminSchema.pre("save", async function (next) {
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
// adminSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// ! Verification method
// adminSchema.methods.verifyCybercafe = async function (cybercafeId) {
//   try {
//     const cafe = await Cybercafe.findById(cybercafeId);
//     if (!cafe) throw new Error("Cybercafe not found");
//     this.verifiedCafes.push(cafe._id);
//     await this.save();
//     return cafe;
//   } catch (err) {
//     throw err;
//   }
// };

const admin = mongoose.model("admin", adminSchema);
module.exports = admin;
