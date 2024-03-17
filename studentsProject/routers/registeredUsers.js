import express from "express";
import connection from "../connectionMysql/connectMysql.js";
import { PrismaClient } from "@prisma/client";

const registeredUsers = express.Router();
const prisma = new PrismaClient();

registeredUsers.post("/", async (req, res) => {
  // vqmni monacemta bazas da teibls qverebis gamoyenebit

  connection.query(
    "CREATE DATABASE IF NOT EXISTS registeredStudents",
    (error, results, fields) => {
      if (error) {
        console.error("Error creating database:", error);
        return;
      }
      // console.log("Database created successfully", results);
    }
  );

  connection.query(
    `CREATE TABLE IF NOT EXISTS registeredStudents.students (
            id INT AUTO_INCREMENT PRIMARY KEY,
            firstName VARCHAR(255),
            lastName VARCHAR(255),
            age VARCHAR(255)
          )`,
    (error, results, fields) => {
      if (error) {
        console.error("Error creating table:", error);
        return;
      }
      // console.log("Table created successfully", results);
    }
  );

  connection.end();

  const { firstName, lastName, age } = req.body;
  console.log(typeof age);
  //   const getUsers = prisma.world.findMany();
  //   res.json(getUsers);
  //   console.log(getUsers);

  const createUsers = await prisma.students.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      age: age,
    },
  });

  console.log(createUsers);
});

export default registeredUsers;
