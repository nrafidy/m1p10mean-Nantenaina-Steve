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
        // console.log(verification);
        // if(verification){
        //     return res.status(401).json(verification);
        // }
        // console.log(verification['userId']);
        var idu = verification['userId']

        var car = {
            matricule: matricule,
            marque: marque,
            model: model,
            image: image,
            deposit: [],
        }

        let user = {_id : mongoose.Types.ObjectId(idu)};
        let newCar = {$push: {car : car}};
    
        const result = await db.collection("User").updateOne(user, newCar);
        
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


module.exports = router;