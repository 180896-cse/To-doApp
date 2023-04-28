const express = require("express");
const path = require("path");

const app = express();

const Port =  3002;

app.listen(Port,()=>{
    console.log(`server listening on: http://localhost:${Port}`);
})