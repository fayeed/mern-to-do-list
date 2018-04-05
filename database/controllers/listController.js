const mongoose = require("mongoose");
const { List } = require("../models/list");

const getList = (req, res) => {
  List.find({ userID: req.query.userID }, (err, list) => {
    if (!list.length) {
      res.send(null);
    } else {
      res.send(list);
    }
  });
};

const addItem = (req, res) => {
  const d = new Date();
  const list = new List({
    userID: req.query.userID,
    message: req.query.message,
    time: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`,
    completed: false
  });

  list.save((err, obj) => {
    if (err) {
      console.error(err);
      res.send(null);
    }
    res.send(obj);
  });
};

const toggleCompleted = (req, res) => {
  List.findByIdAndUpdate(
    req.query.listID,
    { $set: { completed: req.query.checked } },
    (err, obj) => {
      if (err) {
        console.error(err);
        res.send(null);
      }
      res.send(obj);
    }
  );
};

const removeItem = (req, res) => {
  List.findByIdAndRemove(req.query.listID, (err, obj) => {
    if (err) {
      console.error(err);
      res.send(null);
    }
    res.send(obj);
  });
};

module.exports = { addItem, removeItem, toggleCompleted, getList };
