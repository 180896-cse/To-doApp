import path from "path";
import todoTask from "../models/todo.model";
import { NextFunction, Request, Response } from 'express';
import {todoService} from "../service/todo.servce";



//creating an instance for To-do service
try{
var toDoService = new todoService;
}
catch(err){
    console.log(`error occured in class of todo: ${err}`);
};




// Creation of task request status code 201 {data: success}
const createTask = async (req:Request, res:Response)=>{
    try {
        res.json(toDoService.createTask(req.body.todoValue)); 
    } catch (error) {
        console.log(`error occured at create task ${error}`);
        
    }
       
}
  
   




// Getting all task 
const getAllTask = async (req:Request, res:Response)=> {
    const allTask = await todoTask.find();
        res.render("../src/views/pages/home",{allTask});
    
   
}




// Updating task from DB
const updateTask = async (req:Request,res:Response)=> {
    const updatedTask = await todoTask.findByIdAndUpdate(
        req.params._id,
        req.body.todoValue
    ).then(()=>{
        console.log(`Task updated sucessfully`);
        res.redirect("/");
       }).catch((err)=>console.log(`error occured at updataion of task ${err}`));
   
}





// Deleting task from DB
const delTask = async(req:Request,res:Response)=>{
    const id = req.params._id;
    const deleteTask = await todoTask.findByIdAndDelete(
        id
        ).then(()=>{
            console.log(`Task deleted sucessfully`);
            res.redirect("/");
           }).catch((err)=>console.log(`error occured at deletion of task ${err}`));
}


const errPage = async(req:Request, res:Response)=>{
res.render(path.join(__dirname , "../views/pages/404.hbs"));
}


export {createTask, getAllTask, errPage, delTask, updateTask};
// module.exports = {
//     createTask,
//     getAllTask,
//     errPage
// };




 // const task = req.body.todoValue;
    // await todoTask.create({
    //     task
    //    }).then(()=>{
    //         res.status(201);
    //         res.redirect("/");
    //    }).catch((err)=>console.log(err));