import express from "express";
import { prisma } from "../connectionMysql/connectMysql.js";

const students = express.Router();

students.get("/", async (req, res) => {

    try {
    
      const users = await prisma.students.findMany();
      res.render("students/students", { users });
 
    } catch (err) {

      const users = 'no'
      res.render("students/students", {users})
     
    }
  
});

export default students;
