const express = require("express");
const dataRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const User = require("../model/user");

dataRouter.get("/find-data", userAuth, async (req, res) => {
  const userEmail = req.body.email;
  try {
    const users = await User.find({ email: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});
// GET ALL - API
dataRouter.get("/all-users-data", userAuth, async (req, res) => {
  try {
    const allUserDetails = await User.find({});
    if (allUserDetails.length === 0) {
      res.status(404).send("Data is Not there");
    }
    res.status(200).send(allUserDetails);
  } catch (err) {
    res.status(404).send("Something went wrong " + err.message);
  }
});

//PATCH -API
dataRouter.patch("/user-update-data/:userId", userAuth, async (req, res) => {
  const userId = req.params?.userId;
  const userUpdate = req.body;
  try {
    const newUserUpdate = await User.findByIdAndUpdate(
      { _id: userId },
      userUpdate,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    res.status(200).send("Data is Successfully Updated \n " + newUserUpdate);
  } catch (err) {
    res.status(400).send("Update is Failed " + userUpdate);
  }
});

//DELETE - API
dataRouter.delete("/user-data-delete/:userId", userAuth, async (req, res) => {
  const userId = req.params?.userId;
  try {
    const deletingId = await User.findOneAndDelete({ _id: userId });
    console.log(deletingId);
    if (deletingId.length === 0) {
      res.status(404).send("This id is not there " + deletingId);
    }
    res.status(200).send(deletingId + " \n Id has deleted");
  } catch (err) {
    res.status(400).send("Something went wrong \n " + err.message);
  }
});

//DELETE ALL - API
dataRouter.delete("/user-data-delete-all", userAuth, async (req, res) => {
  try {
    const userAllDelete = await User.deleteMany({});
    if (userAllDelete.length === 0) {
      res.status(404).send("Data is not there in Your Profile ");
    }
    res.status(200).send(userAllDelete);
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

module.exports = dataRouter;
