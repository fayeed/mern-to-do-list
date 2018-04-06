const mongoose = require("mongoose");
const { List } = require("../models/list");

// get all the list object from the database related to the user
// get the needs userId for querying the list
const getList = (req, res) => {
  List.find({ userID: req.query.userID }, (err, list) => {
    if (!list.length) {
      res.send(null);
    } else {
      res.send(list);
    }
  });
};

// add a simgle item to the database
// needs message and userId as parameter
const addItem = (req, res) => {
  const d = new Date();
  // intialize a List object
  const list = new List({
    userID: req.query.userID,
    message: req.query.message,
    time: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`,
    completed: false
  });

  // save the list to the database
  list.save((err, obj) => {
    if (err) {
      console.error(err);
      res.send(null);
    }
    res.send(obj);
  });
};

// chnages the complete flag in the listed list item
// needs checked value and listID for the update
const toggleCompleted = (req, res) => {
  List.findByIdAndUpdate(
    req.query.listID,
    { $set: { completed: req.query.checked } },
    (err, obj) => {
      if (err) {
        console.error(err);
        res.send(null);
      }
      // return the toggled object
      res.send(obj);
    }
  );
};

// removes the item from the databse
// needs the listID for querying
const removeItem = (req, res) => {
  List.findByIdAndRemove(req.query.listID, (err, obj) => {
    if (err) {
      console.error(err);
      res.send(null);
    }
    // returns the deleted obj
    res.send(obj);
  });
};

module.exports = { addItem, removeItem, toggleCompleted, getList };
