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
        let now = new Date();
        // console.log(result[0]['datePeremption']);
        now = Date.parse(now.toString());

        const datePeremption = Date.parse(result[0]['datePeremption']);

        if(datePeremption-now > 0) {
            var user = result[0]['user'];
            user['password'] = '';
            res.status(200).json(user);
        }else{
            res.status(500).json({'message':'need to relog'})
        }

        
      }
    });
    
  });

  router.get("/:id", async function (req, res) {
    
    const db = dbo.getDb();

    const id = req.params.id;
    console.log(id);
    let user = {
        _id : mongoose.Types.ObjectId(id)
    }
    
    db.collection("User")
    .find(user)
    .toArray(function (err, result) {
      if (err) {
        res.status(500).json("Error fetching records!");
      } else {
        
        if(result.length > 0) {
            var user = result[0];
            res.status(200).json(user);
        }else{
            res.status(500).json({'message':'user introuvable'})
        }

      }
    });
    
  });

module.exports = router;