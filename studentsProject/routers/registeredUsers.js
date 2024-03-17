import express from "express";

const registeredUsers = express.Router();

registeredUsers.post("/", (req, res) => {
  res.json(req.body);
  console.log(req.body);
});

export default registeredUsers;
