const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://authentication_system_db:rxeRhN35T6ZC3KDo@authentication-system.477wmae.mongodb.net/authSystem",
  );
};

module.exports = connectDB;
