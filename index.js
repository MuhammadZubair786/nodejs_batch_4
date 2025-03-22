const exp = require("express");
const app = exp();
const port = 5000;
var bodyParser = require("body-parser");
var cors = require("cors");
const mainRouter = require("./Router/mainRouter");
const mongoose = require("mongoose");

const cloudinary = require("cloudinary").v2;

require("dotenv").config();

cloudinary.config({
  cloud_name: "dgbkoycyp",
  api_key: "234538123796178",
  api_secret: "s6_KIjrJMO7F6XbJwkiVS4PTjGM",
});

mongoose.connect(process.env.ConnectString);
const db = mongoose.connection;
db.once("open", () => {
  console.log("MONGODB CONNECT");
});

db.on("error", () => {
  console.log("error");
});

bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json({}));

app.use(cors());
app.use(mainRouter);

app.listen(port, () => {
  console.log(`server ready in port ${port}`);
});
