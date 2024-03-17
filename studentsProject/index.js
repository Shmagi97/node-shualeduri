import express from "express";
import cors from "cors";
import routers from "./routers/routes.js";
import mysql2 from "mysql2";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(cors());
app.set("view engine", "ejs");

app.use(express.json({ limit: "100000mb" }));
app.use(express.urlencoded({ extended: "true", limit: "100000mb" }));

// const connection = mysql2.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "Narsa1997@mysql",
//   database: "axaliDatabase",
// });

// connection.connect((err) => {
//   if (err) throw err;
//   console.log("Connected to MySQL server");
// });

// connection.end();

app.use("/", routers);
app.use(express.static("public"));

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Server running  http://localhost:${port}`));
