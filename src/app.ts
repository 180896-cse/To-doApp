import express, { Application } from "express";
import path from "path";
import bodyParser from "body-parser";
import DBconnect  from "./config/db.connect";



//database connection function call up
DBconnect();

const app:Application = express();

//setting view engine
app.set("view engine","hbs");

const Port:number =  3002;

app.use(express.json());

// have to use body parser if we wanna send something to server.
app.use(bodyParser.urlencoded({extended:true}));


// middleware for making View folder static public for acessing the css and js files
app.use(express.static(path.join(__dirname,"../public/assets/css/style.css")));


app.use("/", require(path.join(__dirname,"./Routers/routes")));




//middleware created an route for acessing the html page.
// app.use("/",require(path.join(__dirname,"./Routers/routes")));

try{
app.listen(Port,()=>{
    console.log(`server listening on: http://localhost:${Port}`);
})
}catch(err){
    console.log(`err occured ! : ${err}`);
    
}

