const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error(
            "Email is not currect formate Please check it " + value,
          );
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please Put your Password should be stong");
        }
      },
    },
  },
  {
    timestamps: true,
  },
);
//JWT Authentication
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "Authr#Izat_ion!01345", {
    expiresIn: "7d",
  });
  return token;
};
//Password code
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isValidatePassword = await bcrypt.compare(
    passwordInputByUser,
    passwordHash,
  );
  return isValidatePassword;
};

module.exports = mongoose.model("User", userSchema);
