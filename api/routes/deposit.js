const router = require("express").Router();
const dbo = require("../db/connect");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

const verifyToken = async (token, db) => {
  const tokenDoc = await db
    .collection("token")
    .findOne({ _id: mongoose.Types.ObjectId(token) });
  if (!tokenDoc) {
    return { message: "Invalid token" };
  }
  if (tokenDoc.datePeremption < Date.now()) {
    return { message: "Token expired" };
  }
  return tokenDoc;
};

const verifyCar = async (matricule, db) => {
  const carDoc = await db
    .collection("User")
    .findOne({ "car.matricule": matricule });
  // console.log(!carDoc);
  if (!carDoc) {
    return;
    // return {'message': 'Invalid token'};
  }
  return carDoc;
};

// router.get("/:id", async function (req, res) {

// });

router.post(
  "/create/:matricule",
  [check("access_token").isString()],
  async (req, res) => {
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
      //   let amount = req.body.amount;

      // var depositId = new mongoose.Types.ObjectId();
      let deposit = {
        // _id: depositId,
        State: "deposit",
        createdDate: new Date(),
        updatedDate: new Date(),
        Paiement: "pending",
        reparation: [],
      };
      let query = { "car.matricule": matricule };

      // let car = await db.collection("User").findOne(query);
      let car = await db.collection("Car").findOne({ matricule: matricule });
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }

      query._id = car.user;
      deposit.user = car.user;
      deposit.car = car._id;

      // var mycar = car.car.filter((car) => car.matricule === matricule);
      //   console.log(mycar[0].deposit);
      // let lastDeposit = mycar[0].deposit[mycar[0].deposit.length - 1];
      //   let lastDeposit = car.car[0].deposit[car.car[0].deposit.length -1];
      //   console.log(car.car.filter(car => car.matricule === matricule));

      // if (
      //   lastDeposit &&
      //   (lastDeposit.State !== "collected" || lastDeposit.State !== "cancelled")
      // ) {
      const stillDeposit = false;
      car.deposit.forEach((element) => {
        if (element.State !== "collected" || element.State !== "cancelled") {
          stillDeposit = true;
        }
      });
      if (stillDeposit) {
        return res
          .status(401)
          .json({ message: "this car has a pending deposit" });
      }
      const depositID = await db.collection("Deposit").insertOne(deposit);
      deposit._id = depositID.insertedId;
      const newDeposit = { $push: { deposit: deposit } };
      let update = { $push: { "car.$.deposit": deposit } };
      await db.collection("Car").updateOne(car, newDeposit);
      await db.collection("User").updateOne(query, update);
      return res.status(200).json({ message: "Deposit", deposit: deposit });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "error while adding deposit" });
    }
  }
);

router.get("/:matricule", async function (req, res) {
  const db = dbo.getDb();
  var matricule = req.params.matricule;

  db.collection("User")
    .find({ "car.matricule": matricule }, { projection: { "car.$": 1 } })
    .toArray(function (err, result) {
      console.log(req.params.matricule);
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result[0].car[0].deposit);
      }
    });
});

router.put(
  "/update/:matricule",
  [check("access_token").isString()],
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const db = dbo.getDb();

      const token = req.body.access_token;
      const verifiedToken = await verifyToken(token, db);

      if (!token) {
        return res.status(400).json({ message: "token" });
      }

      const depositId = mongoose.Types.ObjectId(req.body.depositId);
      const deposit = req.body.deposit;
      let depositToUpdate = {};

      deposit = JSON.parse(deposit);

      if (deposit.Paiement) {
        depositToUpdate["car.$.deposit.$[deposit].Paiement"] = deposit.Paiement;
      }
      if (deposit.State) {
        depositToUpdate["car.$.deposit.$[deposit].State"] = deposit.State;
      }
      if (deposit.createdDate) {
        depositToUpdate["car.$.deposit.$[deposit].createdDate"] =
          deposit.createdDate;
      }

      depositToUpdate["car.$.deposit.$[deposit].updatedDate"] = new Date();
      // var update = { $set: depositToUpdate };

      const arrayFilters = [{ "deposit._id": depositId }];

      await db.collection("Deposit").updateOne(
        { _id: depositId },
        {
          $set: {
            State: deposit.State,
            Paiement: deposit.Paiement,
            updatedDate: new Date(),
          },
        }
      );

      await db
        .collection("User")
        .updateOne(
          { "car.deposit._id": mongoose.Types.ObjectId(depositId) },
          { $set: depositToUpdate },
          { arrayFilters: arrayFilters },
          function (err, result) {
            if (err) {
              res.status(500).json(err);
            } else {
              res.status(200).json({ message: "deposit updated" });
            }
          }
        );
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "error while updating deposit" });
    }
  }
);

module.exports = router;
