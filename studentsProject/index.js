import express from "express";
import cors from "cors";
import routers from "./routers/routes.js";

const app = express();
app.use(cors());
app.set("view engine", "ejs");
// app.use(ejsLInt)

app.use(express.json({ limit: "100000mb" }));
app.use(express.urlencoded({ extended: "true", limit: "100000mb" }));

app.use("/", routers);
app.use(express.static("public"));

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Server running  http://localhost:${port}`));
