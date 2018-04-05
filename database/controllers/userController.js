const mongoose = require("mongoose");
const hash = require("password-hash");
const { User } = require("../models/user");

const saveUser = (req, res) => {
  const user = new User({
    username: req.query.username,
    email: req.query.email,
    password: hash.generate(req.query.password)
  });

  User.find({ email: req.query.username }, (err, obj) => {
    if (err) {
      console.error(err);
      res.send(null)
    }

    if (!obj.length) {
      user.save((err, user) => {
        if (err) {
          console.error(err);
          res.send(null)
        }
        res.send(user)
      });
    } else {
      res.send(obj)
    }
  });
};

const getUser = (req, res) => {
  User.findOne({ email: req.query.email }, (err, obj) => {

    if (err) {
      console.error(err, 1);
      res.send(null)
    } else if (obj === null && obj === undefined) {
      console.error(err, 2);
      res.send(null)
    } else if (!hash.verify(req.query.password, obj.password)) {
      console.error(err, obj.password, 3);
      res.send(null)
    } else {
      res.send(obj)
    }
  });
};

module.exports.getUser = getUser;
module.exports.saveUser = saveUser;
