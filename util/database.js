// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-complete",
//   password: "Qwert!2345",
// });

// module.exports = pool.promise();

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize("node-complete", "root", "Qwert!2345", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;

const mongoDb = require("mongodb");
const MongoClient = mongoDb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://choboyedeh17:Qwert!2345@cluster0.pnin6iw.mongodb.net/shop?appName=Cluster0",
  )
    .then((client) => {
      console.log("Connected");
      _db = client.db();
      callback(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

// module.exports = mongoConnect;

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
