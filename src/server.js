const express = require("express");

const app = express();
const port = 3000;

app.use((req, res) => {
  res.send("Server is ready");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}....`);
});
