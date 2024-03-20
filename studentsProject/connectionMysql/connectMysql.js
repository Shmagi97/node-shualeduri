import { PrismaClient } from "@prisma/client";
import mysql2 from "mysql2";

const connection = mysql2.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Narsa1997@mysql",
  //   database: "axaliDatabase",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL server");
});

export default function createDadabaseAndTable() {
     
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
              ID INT AUTO_INCREMENT PRIMARY KEY,
              firstName VARCHAR(255),
              lastName VARCHAR(255),
              age VARCHAR(255),
              userName VARCHAR(255),
              password VARCHAR(255)
            )`,
      (error, results, fields) => {
        if (error) {
          console.error("Error creating table:", error);
          return;
        }
        // console.log("Table created successfully", results);
      }
    );
  
    // connection.end();
}

const prisma = new PrismaClient();

export { connection, prisma, createDadabaseAndTable };

