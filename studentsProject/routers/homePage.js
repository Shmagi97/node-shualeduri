import express from "express";
import { PrismaClient } from "@prisma/client";

const homePage = express.Router();
const prisma = new PrismaClient();

homePage.get("/", (req, res) => {
  res.render("index");
});

// homePage.get("/", async (req, res) => {
//   const getUsers = await prisma.students.findMany();
//   res.json(getUsers);
//   console.log(getUsers);
// });

export default homePage;
