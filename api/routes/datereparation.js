const router = require("express").Router();
const dbo = require("../db/connect");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

const round = function(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  }

router.post(
    "/create",
    async (req, res) => {
      
  
      try {
        const db = await dbo.getDb();
        // var idu = req.body.idUser;
        const repair_id = req.body.repair_id;
  
        const datereparation = {
          debut: new Date(),
          fin: "",
          duree: 0,
          repair_id:  mongoose.Types.ObjectId(repair_id)
        };
  
        await db.collection("dateReparation").insertOne(datereparation);
        return res.status(200).json({ message: "reparation started" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "error while starting reparation" });
      }
    }
);

router.post(
    "/updatedateFin",
    async (req, res) => {
      
  
        try {
            const db = await dbo.getDb();
            const repair_id = req.body.repair_id;
            const fin = new Date();
  
            const dateReparation = await db.collection("dateReparation").findOne({ repair_id: mongoose.Types.ObjectId(repair_id) });
            if (!dateReparation) {
                return res.status(404).json({ message: "DateReparation not found" });
            }
        
            const duree = round((fin.getTime() - dateReparation.debut.getTime()) / (1000 * 3600 ),1);
        
            await db.collection("dateReparation").updateOne(
                { repair_id: mongoose.Types.ObjectId(repair_id) },
                { $set: { fin: fin, duree: duree } }
            );
            return res.status(200).json({ message: "DateReparation updated successfully" });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Error while updating DateReparation" });
        }
    }
);

module.exports = router;