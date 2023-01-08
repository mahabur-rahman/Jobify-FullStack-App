import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    select: false,
  },

  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "lastName",
  },

  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "my city",
  },
});

// hash password
UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());

  if (!this.isModified("password")) return;
  // console.log(this.password);
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// JWT
UserSchema.methods.createJWT = function () {
  // console.log(this); // return use all info 👍

  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

// compare password when user login
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password); // this.password = db password

  return isMatch;
};

export default mongoose.model("User", UserSchema);
