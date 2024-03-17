import express from "express";

const addStudents = express.Router();

addStudents.get("/", (req, res) => {
  res.render("addStudents/addStudents");
});

export default addStudents;
