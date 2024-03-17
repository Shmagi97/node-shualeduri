import express from "express";
import homePage from "./homePage.js";
import addStudents from "./addStudents.js";
import students from "./students.js";
import registeredUsers from "./registeredUsers.js";

const routers = express.Router();

routers.use("/", homePage);
routers.use("/addStudents", addStudents);
routers.use("/students", students);
routers.use("/registeredUsers", registeredUsers);

export default routers;
