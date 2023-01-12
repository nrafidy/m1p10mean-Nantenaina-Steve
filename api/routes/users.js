const router = require("express").Router();
const dbo = require("../db/connect");

var mongoose = require('mongoose');
var id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');

router.get("/me", async function (req, res) {
    const db = dbo.getDb();

    const token = req.body.access_token;
    
    let tok = {
        _id : mongoose.Types.ObjectId(token)
    }
    let tokenFinal = db.collection("token")
    .find(tok)
    .toArray(function (err, result) {
      if (err) {
        res.status(500).json("Error fetching records!");
      } else {
        var user = result[0]['user'];
        user['password'] = '';
        res.status(200).json(user);
      }
    });
    
  });

module.exports = router;