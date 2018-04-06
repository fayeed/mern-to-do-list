const mongoose = require("mongoose");

// List object schema for the object
var listSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  completed: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
});

var List = mongoose.model("List", listSchema);

module.exports.List = List;
