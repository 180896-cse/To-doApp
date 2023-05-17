"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
//reading .env file
require("dotenv").config({ path: path_1.default.resolve(__dirname, "../../.env") });
class Database {
    DBconnect() {
        var db = process.env.mongo_db_conn_string || ".env file mot found!";
        mongoose_1.default
            .connect(db)
            .then(() => {
            // return dbInstance;
            console.log("connection with MongoDB is sucess!!");
        })
            .catch((err) => {
            console.log(`Failed connection with error: ${err}`);
        });
    }
}
exports.Database = Database;
