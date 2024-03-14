import express from "express";

const addStudents = express.Router();

addStudents.get("/", (req, res) => {
  res.send("students page");
});

export default addStudents;
