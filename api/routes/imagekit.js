const ImageKit = require("imagekit");
const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const env = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../config.json"), "utf8")
);

router.get("/auth", async function (req, res) {
  const imagekit = new ImageKit({
    publicKey: env.imageKitIoKeyPub,
    privateKey: env.imageKitIoKeyPrivate,
    urlEndpoint: env.imageKitIoUrl,
  });

  res.status(200).json(imagekit.getAuthenticationParameters());
});

module.exports = router;
