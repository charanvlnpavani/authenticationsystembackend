const validator = require("validator");
const validateSignupData = (req) => {
  const { name, email, password } = req.body;
  if (!name.length === 0) {
    throw new Error("Please Enter your name is Required");
  }
  if (name.length < 4 || name.length > 50) {
    throw new Error(
      "Please Enter your name min 4 character to max 50 characters",
    );
  }
  if (!validator.isEmail(email)) {
    throw new Error("Please Enter your email address currect");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter Password very Strong");
  }
};

module.exports = { validateSignupData };
