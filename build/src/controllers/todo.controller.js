"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiTest = exports.updateTask = exports.delTask = exports.errPage = exports.getAllTask = exports.createTask = void 0;
const path_1 = __importDefault(require("path"));
const todo_model_1 = __importDefault(require("../models/todo.model"));
const todo_servce_1 = require("../service/todo.servce");
//creating an instance for To-do service
var toDoService = new todo_servce_1.todoService();
// Creation of task request status code 201 {data: success}
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body.todoValue;
        res.json((yield toDoService.createTask(body)).msg);
    }
    catch (error) {
        console.error(`error occured at create task ${error}`);
    }
});
exports.createTask = createTask;
// Getting all task
const apiTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield res.send("api Test ok!");
});
exports.apiTest = apiTest;
const getAllTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allTask = yield todo_model_1.default.find();
    res.render("../src/views/pages/home", { allTodos: allTask });
});
exports.getAllTask = getAllTask;
// Updating task from DB
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const upId = req.params.id;
        res.json((yield toDoService.updtTask(body, upId)).msg);
    }
    catch (error) {
        console.error(`error occured at Update task ${error}`);
    }
    // const updtTask = req.body.todoValue;
    // const updatedTask = await todoTask.updateOne(
    //     {"_id" : req.params._id},
    //     {$set:{task:updtTask}}
    // ).then(()=>{
    //     console.log(`Task updated sucessfully`);
    //     res.redirect("/");
    //    }).catch((err)=>console.log(`error occured at updataion of task ${err}`));
});
exports.updateTask = updateTask;
// Deleting task from DB
const delTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params._id;
        res.json((yield toDoService.deleteTask(id)).msg);
    }
    catch (error) {
        console.log(`error occured at deletion of task: ${error}`);
    }
    // const id = req.params._id;
    // const deleteTask = await todoTask.findByIdAndDelete(
    //     id
    //     ).then(()=>{
    //         console.log(`Task deleted sucessfully`);
    //         res.redirect("/");
    //        }).catch((err)=>console.log(`error occured at deletion of task ${err}`));
});
exports.delTask = delTask;
const errPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render(path_1.default.join(__dirname, "../views/pages/404.hbs"));
});
exports.errPage = errPage;
