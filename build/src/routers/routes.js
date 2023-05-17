"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_controller_1 = require("../controllers/todo.controller");
const routers = express_1.default.Router();
//class TODORoutes 
// all inside
// const getAllTask = require("../Controllers/todo.controller").getAllTask;
// const createTask = require("../Controllers/todo.controller").createTask;
// const errPage = require("../Controllers/todo.controller").errPage;
// const getTask = require("../Controllers/todoController").getTask;
routers.route("/").get(todo_controller_1.getAllTask);
routers.route("/api").get(todo_controller_1.apiTest);
routers.route("/api/todoVal").post(todo_controller_1.createTask);
routers.route("/delete/todo/:_id").get(todo_controller_1.delTask);
routers.route("/update/todo/:id").put(todo_controller_1.updateTask);
routers.route("/*").get(todo_controller_1.errPage);
module.exports = routers;
