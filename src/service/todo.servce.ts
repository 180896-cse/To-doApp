import path from "path";
import todoTask from "../models/todo.model";
import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

//custom type
type respons = {
  code: number;
  msg: String;
};


interface create {
    createTask(arg1:Request,arg2:Response):{};
}

export class todoService implements create{
        createTask(req: Request, res: Response): {}{
            const task:String = req.body.todoValue;
            todoTask.create({ task });
            let crtres:respons ={
                    "code": 201,
                    "msg":"Task Created Sucessfully!!"
            }
            return res.json({crtres});
        }

}

