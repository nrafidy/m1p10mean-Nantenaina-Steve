const router = require("express").Router();
const dbo = require("../db/connect");
const nodeoutlook = require("nodejs-nodemailer-outlook");

router.get("/test-db", async function (req, res) {
  const db = dbo.getDb();

  db.collection("Test")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(500).json("Error fetching records!");
      } else {
        res.status(200).json(result);
      }
    });
});

router.post("/test-db/create", function (req, res) {
  const dbConnect = dbo.getDb();

  const data = {
    test: req.body.test,
  };

  dbConnect.collection("Test").insertOne(data, function (err, result) {
    if (err) {
      res.status(500).json("Error inserting matches!");
    } else {
      res.status(200).json(result);
    }
  });
});

router.post("/inscription", async function (req, res) {
  try {
    const dbConnect = dbo.getDb();

    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      type: "client",
      validationEmail: "0",
      car: [],
    };

    //check doublon d'emails
    const sameEmails = await dbConnect
      .collection("User")
      .find({ email: req.body.email })
      .toArray();
    if (sameEmails.length > 0) {
      res
        .status(400)
        .json({ message: "cette email est deja relié a un compte" });
      return;
    }

    const insertUserID = await dbConnect.collection("User").insertOne(user);
    const insertedUser = await dbConnect.collection("User").findOne({_id: insertUserID.insertedId});
    //generer token pour inscription
    let date = new Date();
    date.setDate(date.getDate() + 1);
    const token = {
      user: insertedUser,
      datePeremption: date,
    };
    const insertToken = await dbConnect.collection("token").insertOne(token);

    const fullUrl = req.protocol
      .concat("://")
      .concat(req.get("host"))
      .concat("/api/user/validerEmail/")
      .concat(insertToken.insertedId.toString());

    //envoi email
    await nodeoutlook.sendEmail({
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: "m1p10mean-nantenaina-steve@outlook.com",
        pass: "projetITU2023",
      },
      from: "m1p10mean-nantenaina-steve@outlook.com",
      to: req.body.email,
      subject: "validation d'email",
      html:
        'Veuillez valider votre email en cliquant <a href= "' +
        fullUrl +
        '">ici</a>',
      text: "This is text version!",
      replyTo: "",
      onError: (e) => console.log(e),
      onSuccess: (i) => res.status(200).json("Email envoyé"),
    });

    res.status(200).json(insertToken);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async function (req, res) {
  try {
    const dbConnect = dbo.getDb();
    let user = {
      email: req.body.email,
      password: req.body.password,
    };

    const loggedUser = await dbConnect.collection("User").find(user).toArray();

    if (loggedUser.length > 0 && loggedUser[0].validationEmail === "0") {
      res.status(400).json({ message: "email not valid" });
      return;
    }

    let date = new Date();
    date.setDate(date.getDate() + 5);
    let token = {
      user: loggedUser,
      datePeremption: date,
    };
    const insertToken = await dbConnect.collection("token").insertOne(token);
    token._id = insertToken.insertedId;
    res.status(200).json(token);
    return;
  } catch (error) {
    res.status(500).json(error);
    return;
  }
});

function generateToken(token, dbConnect, res) {
  return dbConnect
    .collection("token")
    .insertOne(token, function (err, result1) {
      if (err) {
        res.status(500).json("Error inserting matches!");
      } else {
        // console.log(result1["insertedId"]);
        let tok = {
          _id: result1["insertedId"],
        };
        return dbConnect
          .collection("token")
          .find(tok)
          .toArray(function (err, result) {
            if (err) {
              // res.status(500).json("Error fetching records!");
              return { status: 500, value: "Error fetching records!" };
            } else {
              // res.status(200).json(result);
              let retour = { status: 200, value: result };
              console.log(retour);
              return retour;
            }
          });
      }
    });
}

module.exports = router;
