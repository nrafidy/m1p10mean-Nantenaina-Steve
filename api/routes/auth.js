const router = require("express").Router();
const dbo = require("../db/connect");
var nodemailer = require('nodemailer');
var nodeoutlook = require('nodejs-nodemailer-outlook');

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

router.post("/inscription", function (req, res)  {
  const dbConnect = dbo.getDb();
  
  // console.log(fullUrl);
  let user = {
      firstname : req.body.firstname,
      lastname : req.body.lastname,
      email : req.body.email,
      password : req.body.password,
      type: 'client',
      validationEmail : '0'
  }

  dbConnect.collection("User")                                                      //check doublon d'emails
    .find({email: req.body.email})
    .toArray(function (err, result) {
      if (err) {
        res.status(500).json("Error fetching records!");
      } else {
        if(result.length>0){
          res.status(500).json({'message' : "cette email est deja relié a un compte"});
        }
      }
    });

    

  dbConnect.collection("User").insertOne(user, function (err, result) {                   //create user
      if (err) {
        res.status(500).json("Error inserting matches!");
      } else {

        const date = new Date();
        date.setDate(date.getDate() + 1);
        // console.log("here");
        console.log(result['insertedId'].toString());
        let token = {
            userId : result['insertedId'].toString(),
            datePeremption : date
        }

        dbConnect.collection("token").insertOne(token, function (err, result1) {    //generer token pour inscription

          if (err) {
              res.status(500).json("Error inserting matches!");
          } else {
            console.log('----------------'+result1["insertedId"]);
              let tok = {
                  _id : result1["insertedId"]
              }
              let tokenFinal = dbConnect.collection("token")
              .find(tok)
              .toArray(function (err, result) {
                if (err) {
                  res.status(500).json("Error fetching records!");
                } else {
                  var fullUrl = req.protocol + '://' + req.get('host')+'/api/user/validerEmail/'+result1["insertedId"].toString();
                  console.log('here');
                  nodeoutlook.sendEmail({                                                           //envois email
                    tls: {
                      rejectUnauthorized: false
                    },
                    auth: {
                      user: "m1p10mean-nantenaina-steve@outlook.com",
                      pass: "projetITU2023",
                      
                    },
                      from: "m1p10mean-nantenaina-steve@outlook.com",
                      to: req.body.email,
                      subject: 'validation d\'email',
                      html: 'Veuillez valider votre email en cliquant <a href= \"'+fullUrl+'\">ici</a>',
                      text: 'This is text version!',
                      replyTo: "",
                      onError: (e) => console.log(e),
                      onSuccess: (i) => res.status(200).json("Email envoyé")
                    });
                  res.status(200).json(result);
                }
              });
          }
          });

        
        // res.status(200).json(result);
      }
    });
});

router.post("/login", function (req, res)  {
  const dbConnect = dbo.getDb();
  let user = {
      email : req.body.email,
      password : req.body.password,
  }

  dbConnect.collection("User")
  .find(user)
  .toArray(function (err, result) {
    if (err) {
      res.status(500).json("Error fetching records!");
    } else {

      if(result[0]['validationEmail'] == '0'){
        res.status(400).json({'message': 'email non valider'})
      }

      const date = new Date();
      date.setDate(date.getDate() + 5);

      let token = {
          user : result[0],
          datePeremption : date
      }
      // var resu = generateToken(token,dbConnect,res);
      // // console.log( generateToken(token,dbConnect,res));
      // console.log(resu);
      // // res.status(resu['status']).json(resu['value'])
      // res.status(200)
      dbConnect.collection("token").insertOne(token, function (err, result1) {

      if (err) {
          res.status(500).json("Error inserting matches!");
      } else {
        console.log(result1["insertedId"]);
          let tok = {
              _id : result1["insertedId"]
          }
          let tokenFinal = dbConnect.collection("token")
          .find(tok)
          .toArray(function (err, result) {
            if (err) {
              res.status(500).json("Error fetching records!");
            } else {
              res.status(200).json(result);
            }
          });
      }
      });
    }
  });
});

function generateToken(token,dbConnect,res) {

  return dbConnect.collection("token").insertOne(token, function (err, result1) {
    
    if (err) {
        res.status(500).json("Error inserting matches!");
    } else {
      // console.log(result1["insertedId"]);
        let tok = {
            _id : result1["insertedId"]
        }
        return dbConnect.collection("token")
        .find(tok)
        .toArray(function (err, result) {
          if (err) {
            // res.status(500).json("Error fetching records!");
            return {status: 500,
            value: "Error fetching records!"}
          } else {
            // res.status(200).json(result);
            let retour = {status: 200,
                        value: result}
                        console.log(retour);
            return retour;
          }
        });
    }
    });
}

module.exports = router;
