const express = require("express");
const user = require("./database/controllers/userController");
const list = require("./database/controllers/listController");
const db = require("./database/database");

// connects to mongo server
db.startMongo();

// intialize
const app = express();

const port = process.env.PORT || 5000;

app.get("/api/getUser", user.getUser);

app.post("/api/addUser", user.saveUser);

app.post('/api/addItem', list.addItem)

app.delete('/api/removeItem', list.removeItem)

app.get('/api/getList', list.getList)

app.put('/api/checked', list.toggleCompleted)

app.listen(port, () => console.log(`Listening on port ${port}`));
