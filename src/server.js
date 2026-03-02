const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const dataRouter = require("./routes/data");
const dashboardRouter = require("./routes/dashboard");

const app = express();
const port = 3000;
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", dataRouter);
app.use("/", dashboardRouter);
//Connect Database
connectDB()
  .then(() => {
    console.log("Successfully connect in Database");
    app.listen(port, () => {
      console.log(`App listening on port ${port}....`);
    });
  })
  .catch((err) => {
    console.log(
      "Something error in Database Please Check it once " + err.message,
    );
  });
