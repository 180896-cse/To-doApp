"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_connect_1 = require("./config/db.connect");
const serverless_http_1 = __importDefault(require("serverless-http"));
//database connection function call up
// DBconnect();
// database instance creation and connection function call .
try {
    var DBConnect = new db_connect_1.Database;
    DBConnect.DBconnect();
}
catch (error) {
    console.log(`error handled at app.ts with db_connection ${error}`);
}
const app = (0, express_1.default)();
//setting view engine
app.set("view engine", "hbs");
const Port = 3002;
app.use(express_1.default.json());
// have to use body parser if we wanna send something to server.
app.use(body_parser_1.default.urlencoded({ extended: true }));
// middleware for making View folder static public for acessing the css and js files
app.use(express_1.default.static(path_1.default.join(__dirname, "../public/assets/css/style.css")));
app.use("/", require(path_1.default.join(__dirname, "./routers/routes")));
//middleware created an route for acessing the html page.
// app.use("/",require(path.join(__dirname,"./Routers/routes")));
// try{
// app.listen(Port,()=>{
//     console.log(`server listening on: http://localhost:${Port}`);
// })
// }catch(err){
//     console.log(`err occured ! : ${err}`);
// }
exports.handler = (0, serverless_http_1.default)(app);
