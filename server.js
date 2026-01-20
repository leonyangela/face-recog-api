const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const image = require("./index");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("this is working");
});

app.post("/image", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log(`app is running on port 3000 `);
});
