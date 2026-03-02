const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../model/user");

//Sign Up API
authRouter.post("/signup", async (req, res) => {
  try {
    //Validate of data
    validateSignupData(req);
    //Encrypt the Password
    const { name, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: passwordHash,
    });

    await user.save();
    res.send("User data add successfully");
  } catch (err) {
    res.status(400).send("Error saving the sign " + err.message);
  }
});
//Login API
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Creditials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //create a JWT
      const token = await user.getJWT();
      //Create a cookie
      res.cookie("token", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });
      res.status(200).send("Login Successfull");
    } else {
      throw new Error("Invalid Creditials");
    }
  } catch (err) {
    res.status(400).send("Error saving the login " + err.message);
  }
});

module.exports = authRouter;
