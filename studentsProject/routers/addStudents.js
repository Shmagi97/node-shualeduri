import express from "express";
import {  createDadabaseAndTable } from "../connectionMysql/connectMysql.js";

const addStudents = express.Router();

addStudents.get("/", (req, res) => {

  createDadabaseAndTable()

  res.render("addStudents/addStudents");
});

export default addStudents;
