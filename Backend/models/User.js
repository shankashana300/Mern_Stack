const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    dob: { type: Date },
    mobile: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    status: { type: Number, required: true, default: 0 },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
