import path from "path";
import todoTask from "../models/todo.model";
import { Request, Response } from "express";

//custom type
type respons = {
  code: number;
  msg: String;
};

// interface create {
//     createTask(task:String):{};
// }

export class todoService {
  async createTask(task: String): Promise<respons> {
    await todoTask.create({ task });
    let crtres = {
      code: 201,
      msg: "Task Created Sucessfully!!",
    };
    return crtres;
  }

  async getAlltask(): Promise<respons> {
    await todoTask.find();
    let getres = {
      code: 200,
      msg: "Task listed Sucessfully!!",
    };
    return getres;
  }

  async deleteTask(taskid: String): Promise<respons> {
    const res = await todoTask.deleteOne({ _id: taskid }, { new: true });
    console.log(res);

    let deltres = {
      code: 200,
      msg: "Task Deleted Sucessfully!!",
    };
    return deltres;
  }

  async updtTask(updtask: String, id: String): Promise<respons> {
    const updtTask = await todoTask.findByIdAndUpdate(id, updtask, {
      new: true,
    });
    console.log(updtTask);

    let updtres = {
      code: 202,
      msg: "Task updated Sucessfully!!",
    };
    return updtres;
  }
}
