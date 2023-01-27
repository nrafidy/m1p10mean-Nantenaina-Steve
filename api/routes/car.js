const router = require("express").Router();
const dbo = require("../db/connect");
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');


const verifyToken = async (token, db) => {                                                                    
    const tokenDoc = await db.collection("token").findOne({_id : mongoose.Types.ObjectId(token)});
    if (!tokenDoc) {
        return {'message': 'Invalid token'};
    }
    if(tokenDoc.datePeremption < Date.now()){
        return {'message': 'Token expired'};
    }
    return tokenDoc;
  }


const verifyCar = async (matricule, db) => {                                                                    
    const carDoc = await db.collection("User").findOne({'car.matricule' : matricule});
    // console.log(!carDoc);
    if (!carDoc) {
        return;
        // return {'message': 'Invalid token'};
    }
    return carDoc;
  }


router.post("/create", [
//   check('idUser').isMongoId(),
  check('matricule').isString(),
  check('marque').isString(),
  check('model').isString(),
  check('image').isString(),
  check('access_token').isString()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const db = await dbo.getDb();
        // var idu = req.body.idUser;
        var matricule = req.body.matricule;
        var marque = req.body.marque;
        var model = req.body.model;
        var image = req.body.image;

        const token = req.body.access_token;
        const verification = await verifyToken(token, db);
        const verificationCar = await verifyCar(matricule,db);
        // console.log(verification);
        if(verification['message']){
            return res.status(401).json(verification);
        }
        if(verificationCar){
            return res.status(401).json('Car already insered');
        }
        // console.log(verification['user'][0]._id);
        var idu = verification['user'][0]._id.toString();

        var car = {
            matricule: matricule,
            marque: marque,
            model: model,
            image: image,
            deposit: [],
        }

        var user = {_id : mongoose.Types.ObjectId(idu)};
        var newCar = {$push: {car : car}};
    
        var result = await db.collection("User").updateOne(user, newCar);
        
        if (result.modifiedCount === 1) {
            return res.status(200).json({'message':'car insered'})
        } else {
            return res.status(500).json({'message':'error1 while adding the car'})
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({'message':'error2 while adding the car'})
    }
});


router.put("/update/:matricule", [
    check('matricule').optional().isString(),
    check('marque').optional().isString(),
    check('model').optional().isString(),
    check('image').optional().isString(),
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
        //   if(verification){
        //       return res.status(401).json(verification);
        //   }
          let matricule = req.params.matricule;
          let updateDoc = {};
          if (req.body.matricule) updateDoc["car.$.matricule"] = req.body.matricule;
          if (req.body.marque) updateDoc["car.$.marque"] = req.body.marque;
          if (req.body.model) updateDoc["car.$.model"] = req.body.model;
          if (req.body.image) updateDoc["car.$.image"] = req.body.image;
          let query = { "car.matricule": matricule };
          let update = { $set: updateDoc };
          let options = {};
          await db.collection("User").updateOne(query, update, options, function(err, result) {
              if (err) {
                  return res.status(500).json({'message': 'Error while updating the car'});
              }
              return res.status(200).json({'message':'car updated'})
          });
        } catch (err) {
            console.log(err)
            return res.status(500).json({'message':'error2 while adding the car'})
        }
    });

router.delete("/delete/:matricule", [
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
            // if(verification){
            //     return res.status(401).json(verification);
            // }
            let matricule = decodeURIComponent(req.params.matricule);
            let query = { "car.matricule": matricule };
            let update = { $pull: { car: { matricule: matricule } } };
            await db.collection("User").updateOne(query, update, function(err, result) {
                if (err) {
                    return res.status(500).json({'message': 'Error while deleting the car'});
                }
                return res.status(200).json({'message':'car deleted'})
            });
        } catch (err) {
            console.log(err)
            return res.status(500).json({'message':'error while deleting the car'})
        }
    });

router.get("/:matricule", [
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
        let matricule = decodeURIComponent(req.params.matricule);
        let query = { "car.matricule": matricule };
        let car = await db.collection("User").findOne(query);
        if (!car) {
            return res.status(404).json({'message': 'car not found'});
        }
        return res.status(200).json(car);
    } catch (err) {
        console.log(err)
        return res.status(500).json({'message':'error while getting the car'})
    }
});


router.get("/matricule/:matricule", [
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
        //   if(verification){
        //       return res.status(401).json(verification);
        //   }
          let matricule = decodeURIComponent(req.params.matricule);
          let query = { "car.matricule": matricule };
          let car = await db.collection("User").findOne(query);
          if (!car) {
              return res.status(404).json({'message': 'car not found'});
          }
          return res.status(200).json(car);
      } catch (err) {
          console.log(err)
          return res.status(500).json({'message':'error while getting the car'})
      }
  });


module.exports = router;