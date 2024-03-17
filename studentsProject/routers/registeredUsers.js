import express from "express";
import { connection, prisma } from "../connectionMysql/connectMysql.js";

const registeredUsers = express.Router();

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

  const createUsers = await prisma.students.create({
    data: {
      firstName,
      lastName,
      age,
    },
  });

  if (createUsers)
    res
      .status(200)
      .json({ success: `მომხმარებელი ${firstName} ${lastName} დამატებულია` });
});

export default registeredUsers;
