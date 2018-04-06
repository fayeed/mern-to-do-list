const mongoose = require("mongoose");
const hash = require("password-hash");
const { User } = require("../models/user");

// save the user to the database
// but first check that if the user already exist
// with the same email id if so reject the request
// same username are allowed
const saveUser = (req, res) => {
  // initialize the user object
  const user = new User({
    username: req.query.username,
    email: req.query.email,
    password: hash.generate(req.query.password)
  });

  // find the user
  User.find({ email: req.query.username }, (err, obj) => {
    if (err) {
      console.error(err);
      res.send(null);
    }

    // check if user exists or not
    // if not save it to the database
    if (!obj.length) {
      user.save((err, user) => {
        if (err) {
          console.error(err);
          res.send(null);
        }
        // display the already existing user
        res.send(user);
      });
    } else {
      // display the created user
      res.send(obj);
    }
  });
};

// login Process check if there is a
// user in the database if not reject the request
const getUser = (req, res) => {
  // find onlyone entry if exist there
  User.findOne({ email: req.query.email }, (err, obj) => {
    // check for error || check for wrong password
    // if exist return null
    // if not return user
    if (err) {
      console.error(err, 1);
      res.send(null);
    } else if (obj === null && obj === undefined) {
      console.error(err, 2);
      res.send(null);
    } else if (!hash.verify(req.query.password, obj.password)) {
      console.error(err, obj.password, 3);
      res.send(null);
    } else {
      res.send(obj);
    }
  });
};

module.exports.getUser = getUser;
module.exports.saveUser = saveUser;
