const router = require("express").Router();
const dbo = require("../db/connect");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

const verifyToken = async (token, db) => {
  const tokenDoc = await db
    .collection("token")
    .findOne({ _id: mongoose.Types.ObjectId(token) });

  // if (!tokenDoc) {
  //   return { message: "Invalid token" };
  // }
  // if (tokenDoc.datePeremption < Date.now()) {
  //   return { message: "Token expired" };
  // }
  // var userid = tokenDoc.user._id;
  // var user = await db
  //   .collection("User")
  // .findOne({ _id: mongoose.Types.ObjectId(userid) });
  // console.log(user);
  // if(user.type != 'res_atelier') {
  //     return {'message': 'vous n\'etes pas autorise a acceder a cette fonctionalité'};
  // }
  return tokenDoc;
};

router.post(
  "/create",
  [
    check("type").isString(),
    check("name").isString(),
    check("montant").isNumeric(),
    check("depositId").isString(),
    check("access_token").isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const db = await dbo.getDb();
      const token = req.body.access_token;
      const verification = await verifyToken(token, db);
      // if (verification["message"]) {
      if (!verification) {
        return res.status(401).json(verification);
      }
      var depositId = req.body.depositId;
      // var reparationId = new mongoose.Types.ObjectId();
      var reparation = {
        // _id: reparationId,
        State: "todo",
        type: req.body.type,
        name: req.body.name,
        montant: req.body.montant,
        paiement: "pending",
        deposit: mongoose.Types.ObjectId(depositId),
      };
      //   var query = { "car.deposit._id": mongoose.Types.ObjectId(depositId) };
      var query = { "car.deposit._id": depositId };

      var update = {
        $push: { "car.$.deposit.$[deposit].reparation": reparation },
      };
      const arrayFilters = [
        { "deposit._id": mongoose.Types.ObjectId(depositId) },
      ];

      const inserted = await db.collection("Repair").insertOne(reparation);
      reparation._id = inserted.insertedId;

      await db.collection("Deposit").updateOne(
        { _id: reparation.depositId },
        {
          $push: {
            reparation: reparation,
          },
        }
      );

      await db
        .collection("User")
        .updateOne(query, update, { arrayFilters: arrayFilters });
      // console.log(result);
      return res
        .status(200)
        .json({ message: "reparation added", repair: reparation });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "error while adding reparation" });
    }
  }
);

router.put(
  "/update",
  [
    check("repair").isString(),
    check("depositId").isString(),
    check("access_token").isString(),
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

      const depositId = req.body.depositId;
      const repair = req.body.repair;
      const repairId = mongoose.Types.ObjectId(repair._id);
      let repairToUpdate = {};
      // console.log(repair);
      repair = JSON.parse(repair);
      if (repair.type) {
        repairToUpdate["car.$.deposit.$[deposit].reparation.$[].type"] =
          repair.type;
      }
      if (repair.State) {
        repairToUpdate["car.$.deposit.$[deposit].reparation.$[].State"] =
          repair.State;
      }
      if (repair.name) {
        repairToUpdate["car.$.deposit.$[deposit].reparation.$[].name"] =
          repair.name;
      }
      if (repair.montant) {
        repairToUpdate["car.$.deposit.$[deposit].reparation.$[].montant"] =
          repair.montant;
      }
      if (repair.paiement) {
        repairToUpdate["car.$.deposit.$[deposit].reparation.$[].paiement"] =
          repair.paiement;
      }

      const arrayFilters = [
        {
          "deposit._id": mongoose.Types.ObjectId(depositId),
          "deposit.reparation": {
            $elemMatch: {
              _id: mongoose.Types.ObjectId(repairId),
            },
          },
        },
      ];

      await db.collection("Repair").updateOne(
        { _id: repairId },
        {
          $set: {
            type: repair.type,
            state: repair.State,
            name: repair.name,
            montant: repair.montant,
            paiement: repair.paiement,
          },
        }
      );
      await db
        .collection("User")
        .updateOne(
          { "car.deposit._id": mongoose.Types.ObjectId(depositId) },
          { $set: repairToUpdate },
          { arrayFilters: arrayFilters }
        );
      res.status(200).json({ message: "repaire updated" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "error while updating repair" });
    }
  }
);

module.exports = router;
