//initialize
const shortid = require("shortid");
const express = require("express");
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ hello: "world" });
});

// data
const users = [];

//endpoints

// - POST
server.post("/api/users", (req, res) => {
  const data = req.body;
  if (data.name && data.bio) {
    const thisId = shortid.generate();
    users.push({ id: thisId, ...data });
    res.status(201).json({ data, users });
  } else {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user."})
  }
});

// - GET

// - GET by id

// - DELETE

// - PUT

//footer
const port = 5000;
server.listen(port, () => console.log("server running..."));
