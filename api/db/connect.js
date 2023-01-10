const { MongoClient } = require("mongodb");

const fs = require("fs");
const path = require("path");
const env = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../config.json"), "utf8")
);

const connectionString = env.ATLAS_URI;

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("m1p10mean-Nantenaina-Steve");

      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};
