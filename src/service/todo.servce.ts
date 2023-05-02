import path from "path";
import todoTask from "../models/todo.model";
import {Request, Response } from "express";


//custom type
type respons = {
  "code": number;
  "msg": String;
};


// interface create {
//     createTask(task:String):{};
// }

export class todoService{
        createTask(task:String):respons{
            todoTask.create({ task });
            let crtres={
                    "code": 201,
                    "msg":"Task Created Sucessfully!!"
            };
            return (crtres);
        };

       getAlltask():respons{
            todoTask.find(); 
            let getres={
                "code": 200,
                "msg":"Task listed Sucessfully!!"
            };
            return (getres);      
        };

        deleteTask(taskid:any):respons{
           todoTask.findByIdAndDelete(taskid);
            let deltres={
                    "code": 200,
                    "msg":"Task Deleted Sucessfully!!"
            };
            return (deltres);
        };
        updateTask():void{
            
        }

}

