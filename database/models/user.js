const mongoose = require("mongoose");

// user object schema for the object
var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

var User = mongoose.model("User", userSchema);

module.exports.User = User;
