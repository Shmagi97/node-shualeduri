import express from "express";
import homePage from "./homePage.js";
import addStudents from "./addStudents.js";

const routers = express.Router();

routers.use("/", homePage);
routers.use("/addStudents", addStudents);

export default routers;
