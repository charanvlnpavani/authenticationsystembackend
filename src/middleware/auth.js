const jwt = require("jsonwebtoken");
const User = require("../model/user");

const userAuth = async (req, res, next) => {
  //Read the token from the req cookies
  try {
    const { token } = req.cookies;
    const decoderObj = await jwt.verify(token, "Authr#Izat_ion!01345");
    const user = await User.findById(decoderObj._id);
    if (!user) {
      throw new error("User is not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error - " + err.message);
  }
};

module.exports = { userAuth };
