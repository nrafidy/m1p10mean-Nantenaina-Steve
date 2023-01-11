const router = require("express").Router();
const dbo = require("../db/connect");

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

module.exports = router;