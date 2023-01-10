const router = require("express").Router();
const dbo = require("../db/connect");

router.get("/test-db", async function (req, res) {
  const db = dbo.getDb();

  db.collection("Test")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(500).json("Error fetching records!");
      } else {
        res.status(200).json(result);
      }
    });
});

router.post("/test-db/create", function (req, res) {
  const dbConnect = dbo.getDb();

  const data = {
    test: req.body.test,
  };

  dbConnect.collection("Test").insertOne(data, function (err, result) {
    if (err) {
      res.status(500).json("Error inserting matches!");
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
