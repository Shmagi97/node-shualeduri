import express from "express";
import { prisma } from "../connectionMysql/connectMysql.js";

const students = express.Router();

students.get("/", async (req, res) => {
  const studentsList = await prisma.students.findMany();

  const name = "studentsList";
  res.render("students/students", { studentsList });
});

export default students;
