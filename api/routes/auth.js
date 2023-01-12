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

router.post("/inscription", function (req, res)  {
  const dbConnect = dbo.getDb();
  let user = {
      firstname : req.body.firstname,
      lastname : req.body.lastname,
      email : req.body.email,
      password : req.body.password,
      type: 'client'
  }
  dbConnect.collection("User").insertOne(user, function (err, result) {
      if (err) {
        res.status(500).json("Error inserting matches!");
      } else {
        res.status(200).json(result);
      }
    });
});

router.post("/login", function (req, res)  {
  const dbConnect = dbo.getDb();
  let user = {
      email : req.body.email,
      password : req.body.password,
  }

  dbConnect.collection("User")
  .find(user)
  .toArray(function (err, result) {
    if (err) {
      res.status(500).json("Error fetching records!");
    } else {
      const date = new Date();
      console.log(date);
      date.setDate(date.getDate() + 5);
      console.log(date.getDate());
      
      let token = {
          user : result[0],
          datePeremption : date
      }
      dbConnect.collection("token").insertOne(token, function (err, result1) {
      if (err) {
          res.status(500).json("Error inserting matches!");
      } else {
        console.log(result1["insertedId"]);
          let tok = {
              _id : result1["insertedId"]
          }
          let tokenFinal = dbConnect.collection("token")
          .find(tok)
          .toArray(function (err, result) {
            if (err) {
              res.status(500).json("Error fetching records!");
            } else {
              res.status(200).json(result);
            }
          });
      }
      });
    }
  });
});

module.exports = router;
