const v1Api = require("express").Router();

const students = require("./students");
const faculties = require("./faculties");

v1Api.use("/api/v1", students);
v1Api.use("/api/v1", faculties);

module.exports = v1Api;
