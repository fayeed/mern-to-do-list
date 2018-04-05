const mongoose = require("mongoose");

const startMongo = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect("mongodb://test:test@ds115749.mlab.com:15749/mongoose");

  var db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection failed"));
  db.once("open", console.log.bind(console, "connection successful"));

  return db;
};

module.exports.startMongo = startMongo;
