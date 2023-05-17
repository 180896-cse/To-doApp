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
exports.todoService = void 0;
const todo_model_1 = __importDefault(require("../models/todo.model"));
// interface create {
//     createTask(task:String):{};
// }
class todoService {
    createTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            yield todo_model_1.default.create({ task });
            let crtres = {
                code: 201,
                msg: "Task Created Sucessfully!!",
            };
            return crtres;
        });
    }
    getAlltask() {
        return __awaiter(this, void 0, void 0, function* () {
            yield todo_model_1.default.find();
            let getres = {
                code: 200,
                msg: "Task listed Sucessfully!!",
            };
            return getres;
        });
    }
    deleteTask(taskid) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield todo_model_1.default.deleteOne({ _id: taskid }, { new: true });
            console.log(res);
            let deltres = {
                code: 200,
                msg: "Task Deleted Sucessfully!!",
            };
            return deltres;
        });
    }
    updtTask(updtask, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const updtTask = yield todo_model_1.default.findByIdAndUpdate(id, updtask, {
                new: true,
            });
            console.log(updtTask);
            let updtres = {
                code: 202,
                msg: "Task updated Sucessfully!!",
            };
            return updtres;
        });
    }
}
exports.todoService = todoService;
