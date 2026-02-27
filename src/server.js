const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");

const app = express();
const port = 3000;

app.get("/admin/data", adminAuth, (req, res) => {
  res.send("Server is ready");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}....`);
});
