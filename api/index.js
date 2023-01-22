const express = require("express");
const cors = require("cors");
const dbo = require("./db/connect");
require("dotenv").config();

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const depositRoute = require("./routes/deposit");
const carRoute = require("./routes/car");
const imageKitRoute = require("./routes/imagekit");
const repairRoute = require("./routes/reparation");

const app = express();

//middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/imagekit", imageKitRoute);
app.use("/api/user", userRoute);
app.use("/api/deposit", depositRoute);
app.use("/api/car", carRoute);
app.use("/api/repair", repairRoute);

dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
  app.listen(process.env.PORT, () => {
    console.log(process.env.PORT);
  });
});
