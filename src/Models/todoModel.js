// This file contain schema of to-do db

const mongooes = require("mongoose");


const todoSchema = mongooes.Schema({
    taskID:{
        type : Number,
        required:[true," TaskID is mandatory input"]
    },
    task:{
        type : String,
        required:[true," Task is mandatory input"]
    }
});

const todo = mongooes.model("todo", todoSchema);

module.exports = todo;