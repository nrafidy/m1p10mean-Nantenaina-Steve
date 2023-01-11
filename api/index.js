const express = require("express");
const dbo = require("./db/connect");

// const authRoute = require("./routes/auth");

const userRoute = require("./routes/users");


const fs = require("fs");
const path = require("path");
const env = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../config.json"), "utf8")
);

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api/auth", authRoute);
app.use("/api/auth", userRoute);

dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
  app.listen(env.PORT, () => {
    console.log(env.PORT);
  });
});
