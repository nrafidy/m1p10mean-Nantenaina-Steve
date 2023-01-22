const router = require("express").Router();
const dbo = require("../db/connect");
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');


const verifyToken = async (token, db) => {                                                                    
    const tokenDoc = await db.collection("token").findOne({_id : mongoose.Types.ObjectId(token)});
    
    if (!tokenDoc) {
        return {'message': 'Invalid token'};
    }
    console.log(tokenDoc);
    var userid = tokenDoc.userId;
    var user = await db.collection('User').findOne({_id : mongoose.Types.ObjectId(userid)});
    // console.log(user);
    if(user.type != 'res_atelier') {
        return {'message': 'vous n\'etes pas autorise a acceder a cette fonctionalité'};
    }
    if(tokenDoc.datePeremption < Date.now()){
        return {'message': 'Token expired'};
    }
    return tokenDoc;
  }

router.post("/create", [
    check('type').isString(),
    check('name').isString(),
    check('montant').isString(),
    check('depositId').isString(),
    check('access_token').isString()
  ], async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
      }
      try {
          const db = await dbo.getDb();
          const token = req.body.access_token;
          const verification = await verifyToken(token, db);
            if(verification){
                return res.status(401).json(verification);
            }
        var depositId = req.body.depositId;
        var reparationId = new mongoose.Types.ObjectId();
          let reparation = {
              _id: reparationId,
              State: "todo",
              type: "reparation",
              name: req.body.name,
              montant: req.body.montant,
              paiement :"pending"
          };
        //   let query = { "car.deposit._id": mongoose.Types.ObjectId(depositId) };
          let query = { "car.deposit._id": depositId };
          
          let update = { $push: { "car.$.deposit.$[deposit].reparation": reparation } };
          const arrayFilters = [{ "deposit._id": mongoose.Types.ObjectId(depositId) }];

          await db.collection("User").updateOne(query, update,{ arrayFilters: arrayFilters }, function(err, result) {
              if (err) {
                console.log(err);
                  return res.status(500).json({'message': 'Error while adding reparation'});
              }
              console.log(result);
              return res.status(200).json({'message':'reparation added'})
          });
      } catch (err) {
          console.log(err)
          return res.status(500).json({'message':'error while adding reparation'})
      }
  });


  
router.put("/update",
[
    check('repair').isString(),
    check('depositId').isString(),
    check('access_token').isString(),
],
async function (req, res) {
const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
  }
  try {
const db = dbo.getDb();

const token = req.body.access_token;
await verifyToken(token, db);

var depositId = req.body.depositId;
var repairId ;
var repair = req.body.repair;
var repairToUpdate = {};
// console.log(repair);
repair =  JSON.parse(repair);
if(repair._id) repairId = repair._id;
if(repair.type) repairToUpdate["car.$.deposit.$[deposit].reparation.$[].type"] = repair.type;
if(repair.State) repairToUpdate["car.$.deposit.$[deposit].reparation.$[].State"] = repair.State;
if(repair.name) repairToUpdate["car.$.deposit.$[deposit].reparation.$[].name"] = repair.name;
if(repair.montant) repairToUpdate["car.$.deposit.$[deposit].reparation.$[].montant"] = repair.montant;

const arrayFilters = [
    { 
        "deposit._id": mongoose.Types.ObjectId(depositId),
        "deposit.reparation": {
            $elemMatch: {
                "_id": mongoose.Types.ObjectId(repairId)
            }
        }
    }
];



db.collection("User").updateOne(
    {"car.deposit._id": mongoose.Types.ObjectId(depositId) }, 
    { $set: repairToUpdate }, 
    { arrayFilters: arrayFilters },
    function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).json(err);
        } else {
            console.log(result)
            res.status(200).json({ 'message': 'repaire updated' });
        }
    }
);
} catch (err) {
    console.log(err)
    return res.status(500).json({'message':'error while updating repair'})
}
});

  module.exports = router;