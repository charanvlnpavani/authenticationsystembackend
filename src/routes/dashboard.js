const express = require("express");
const dashboardRouter = express.Router();
const { userAuth } = require("../middleware/auth");

dashboardRouter.get("/dashboard", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send("This is dashboard \n" + user);
  } catch (err) {
    res.status(400).send("Error in Token...! User Please Login ");
  }
});

module.exports = dashboardRouter;
