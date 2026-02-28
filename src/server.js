const express = require("express");
// const { adminAuth, userAuth } = require("./middleware/auth");
const connectDB = require("./config/db");
const bcrypt = require("bcrypt");

const User = require("./model/user");
const { validateSignupData } = require("./utils/validation");
const app = express();
const port = 3000;
app.use(express.json());
//POST - API
app.post("/signup", async (req, res) => {
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

app.get("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Creditials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.status(200).send("Login Successfull");
    } else {
      throw new Error("Invalid Creditials");
    }
  } catch (err) {
    res.status(400).send("Error saving the login " + err.message);
  }
});

//GET - API
app.get("/find-data", async (req, res) => {
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
app.get("/all-users-data", async (req, res) => {
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
app.patch("/user-update-data/:userId", async (req, res) => {
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
app.delete("/user-data-delete", async (req, res) => {
  const userId = req.body.userId;
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
app.delete("/user-data-delete-all", async (req, res) => {
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

//Connect Database
connectDB()
  .then(() => {
    console.log("Successfully connect in Database");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}....`);
    });
  })
  .catch((err) => {
    console.log("Something error in Database Please Check it once");
  });
