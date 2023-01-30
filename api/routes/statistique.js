const router = require("express").Router();
const dbo = require("../db/connect");

// const mongoose = require("mongoose");

router.get("/cajour/:date", async function (req, res) {
    try {
        const db = await dbo.getDb();
        var date = req.params.date;
        var startOfDay = new Date(date + "T00:00:00.000Z");
        var endOfDay = new Date(date + "T23:59:59.999Z");
        db.collection("paiement").aggregate([
            {
                $match: {
                    "date": {
                        $gte: startOfDay,
                        $lt: endOfDay
                    }
                }
            },
        ]).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            var total = 0.0;
            for(let i = 0; i < result.length; i++){
                console.log(i);
                total+= parseFloat(result[i].montant);
            }
            return res.status(200).json({'total':total});
        });
    }catch (err) { 
        console.log(err);
        return res.status(500).json({ message: "error while doing a paiement" });
    }
    return res.status(200);
});




module.exports = router;