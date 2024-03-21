import express from "express";
import homePage from "./homePage.js";
import addStudents from "./addStudents.js";
import students from "./students.js";
import registeredUsers from "./registeredUsers.js";
import logginedUsers from "./logginedUsers.js";

const routers = express.Router();

routers.use("/", homePage);
routers.use("/addStudents", addStudents);
routers.use("/students", students);
routers.use("/registeredUsers", registeredUsers);
routers.use('/logginedUsers', logginedUsers)

export default routers;
