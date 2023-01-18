const express = require("express");
const dbo = require("./db/connect");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const depositRoute = require("./routes/deposit");
const carRoute = require("./routes/car");
const imageKitRoute = require("./routes/imagekit");

const fs = require("fs");
const path = require("path");
const env = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../config.json"), "utf8")
);

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/imagekit", imageKitRoute);
app.use("/api/user", userRoute);
app.use("/api/deposit", depositRoute);
app.use("/api/car", carRoute);

dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
  app.listen(env.PORT, () => {
    console.log(env.PORT);
  });
});
