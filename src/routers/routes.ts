import express, { Router } from "express";
import {getAllTask,createTask,errPage,delTask,updateTask} from "../controllers/todo.controller";
const routers:Router = express.Router();
//class TODORoutes 
// all inside
// const getAllTask = require("../Controllers/todo.controller").getAllTask;
// const createTask = require("../Controllers/todo.controller").createTask;
// const errPage = require("../Controllers/todo.controller").errPage;
// const getTask = require("../Controllers/todoController").getTask;

routers.route("/").get(getAllTask);

routers.route("/api/todoVal").post(createTask);

routers.route("/delete/todo/:_id").get(delTask);

routers.route("/update/todo/:_id").put(updateTask);

routers.route("/*").get(errPage);

module.exports = routers;