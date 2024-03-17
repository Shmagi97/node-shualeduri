import express from "express";

const students = express.Router();

students.get("/", (req, res) => {
  const name = "shmagi";
  res.render("students/students", { name });
  //   res.send("get students");
});

export default students;
