const mongoose = require("mongoose");

// intialize the mongodb database
const startMongo = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect("mongodb://test:test@ds115749.mlab.com:15749/mongoose"); // need to change with a place holder

  // get the reference to the database
  var db = mongoose.connection;

  // binds the db object to some handler
  db.on("error", console.error.bind(console, "connection failed"));
  db.once("open", console.log.bind(console, "connection successful"));

  // return the db object
  return db;
};

module.exports.startMongo = startMongo;
