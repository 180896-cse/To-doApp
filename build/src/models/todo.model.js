"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This file contain schema of to-do db
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    task: {
        type: String,
        required: [true, " Task is mandatory input"],
    },
});
const DBconnect = (0, mongoose_1.model)("todo", todoSchema);
exports.default = DBconnect;
