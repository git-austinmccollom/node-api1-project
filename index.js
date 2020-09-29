//initialize
const shortid = require("shortid");
const express = require("express");
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ hello: "world" });
});

// data
let users = [];

//endpoints

// - POST
server.post("/api/users", (req, res) => {
  const data = req.body;
  if (data.name && data.bio) {
    const thisId = shortid.generate();
    try {
      users.push({ id: thisId, ...data });
    } catch (err) {
      res.status(500).json({
        errorMessage:
          "There was an error while saving the user to the database",
      });
    }
    res.status(201).json({ data, users });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

// - GET
server.get("/api/users/", (req, res) => {
  try {
    res.status(200).json({ data: users });
  } catch (err) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

// - GET by id
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((u) => id === u.id);
  if (user) {
    res.status(200).json({ data: user });
  } else {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
});

// - DELETE
server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((u) => id === u.id);
  if (user) {
    users = users.filter((u) => id !== u.id);
    res.status(200).json({ data: users });
  } else {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
});

// - PUT
server.put("/api/users/:id", (req, res) => {
  const data = req.body;

  if (data.name && data.bio) {
    const id = req.params.id;
    const user = users.find((u) => id === u.id);
    if (user) {
      users = users.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            name: data.name,
            bio: data.bio,
          };
        } else {
          return user;
        }
      });
      res.status(200).json({ data: users });
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

//footer
const port = 5000;
server.listen(port, () => console.log("server running..."));
