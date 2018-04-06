const express = require("express");
const user = require("./database/controllers/userController");
const list = require("./database/controllers/listController");
const db = require("./database/database");

// connects to mongo server
db.startMongo();

// intialize the express app
const app = express();

// get th port no from the user else set it to default 5000
const port = process.env.PORT || 5000;

// exposed rest api endpoints
app.get("/api/getUser", user.getUser);

app.post("/api/addUser", user.saveUser);

app.post('/api/addItem', list.addItem)

app.delete('/api/removeItem', list.removeItem)

app.get('/api/getList', list.getList)

app.put('/api/checked', list.toggleCompleted)

//listen on the port for request
app.listen(port, () => console.log(`Listening on port ${port}`));
