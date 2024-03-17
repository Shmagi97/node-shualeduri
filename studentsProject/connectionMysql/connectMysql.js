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

export default connection;
