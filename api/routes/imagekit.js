const ImageKit = require("imagekit");
const router = require("express").Router();
// const path = require("path");
// const fs = require("fs");
// const env = JSON.parse(
//   fs.readFileSync(path.join(__dirname, "../../config.json"), "utf8")
// );
require("dotenv").config();

router.get("/auth", async function (req, res) {
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_IO_PUB_KEY,
    privateKey: process.env.IMAGEKIT_IO_PRI_KEY,
    urlEndpoint: process.env.IMAGEKIT_IO_URL,
  });

  res.status(200).json(imagekit.getAuthenticationParameters());
});

module.exports = router;
