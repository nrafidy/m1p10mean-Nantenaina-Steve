const router = require("express").Router();
const dbo = require("../db/connect");

const mongoose = require("mongoose");

router.post("/", async function (req, res) {
    try {

    const db = await dbo.getDb();
    var montant = req.body.montant;
    var repair_id = req.body.repair_id;
    
    var payment = {
        "date": new Date(),
        "montant":montant,
        "repair_id": mongoose.Types.ObjectId(repair_id)
    };
    db.collection("paiement").insert(payment, function(err, result) {
        console.log('here');
            if (err) {
                return res.status(500).json({ message: "error1 while doing a paiement" });
            } else {
                return res.status(200).json({ message: "payment added" });
            }
        }
    );
    }catch (err) { 
        console.log(err);
        return res.status(500).json({ message: "error while doing a paiement" });
    }
});


module.exports = router;