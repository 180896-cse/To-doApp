"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlHandler = void 0;
const server_1 = require("@apollo/server");
const aws_lambda_1 = require("@as-integrations/aws-lambda");
const path_1 = __importDefault(require("path"));
const db_connect_1 = require("./config/db.connect");
const todo_model_1 = __importDefault(require("./models/todo.model"));
//reading data from .env file 
require('dotenv').config({ path: path_1.default.resolve(__dirname, '../.env') });
// Dynmo DB Connection and all CRUD operation
// include this into package.json file
// "start": "ts-node-dev ./src/graphql.server.ts",
//Dynmo DB configuration
//   const awsconfig = {
//     "region":"ap-south-1",
//     "endpoint" : "https://dynamodb.ap-south-1.amazonaws.com",
//     "accessKeyId":"AKIAWMAOUJLA5LDR2HVZ", "secretAccessKey" : "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"
//   };
//    AWS.config.update(awsconfig);
//   //Read Operation
// try{
//   const client = new AWS.DynamoDB.DocumentClient();
//   const tableName = 'demoDynmoDB';
//   var params = {
//     TableName: tableName
// };
// client.scan(params,(err,data)=>{
//   if(err){
//     console.log(`error ocured at get request ${err}`);
//   }else{
//     console.log(data);
//   }
// })
// }
// catch(error){
//   console.log(error);
// }
// Mongo DB database instance creation and connection function call .
try {
    var DBConnect = new db_connect_1.Database();
    DBConnect.DBconnect();
}
catch (error) {
    console.log(`error handled at app.ts with db_connection ${error}`);
}
const PORT = 3003;
const typeDefs = `#graphql
  type Task {
    id: ID!
    task: String!
  }

  type Query {
    getTasks: [Task]
    getTask(id: String!): Task
  }

  type Mutation {
    addTask(task: String!): Task
    updateTask(id: ID!, task: String!): Task
    deleteTask(id: ID!): Task
  }
`;
const getTask = (parents, args) => __awaiter(void 0, void 0, void 0, function* () {
    return yield todo_model_1.default.findById(args.id);
});
const resolvers = {
    Query: {
        getTasks: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield todo_model_1.default.find({});
        }),
        getTask: getTask,
    },
    Mutation: {
        addTask: (parents, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield todo_model_1.default
                .create({ task: args.task })
                .catch((err) => console.log(`error at Add Task ${err}`));
        }),
        updateTask: (parents, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield todo_model_1.default.findOneAndUpdate({ _id: args.id }, { $set: { task: args.task } }, { new: true });
        }),
        deleteTask: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield todo_model_1.default
                .findByIdAndDelete(args.id)
                .catch((err) => console.log(`error at Delete Task operation ${err}`));
        }),
    },
};
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.NODE_ENV !== 'production'
    // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});
// server
//   .listen(PORT)
//   .then(({ url }) => {
//     console.log(`GraphQL Server ready at: ${url}`);
//   })
//   .catch((err) => console.log(`error at server creation ${err}`));
// export const handler = serverless(server);
// This final export 
exports.graphqlHandler = (0, aws_lambda_1.startServerAndCreateLambdaHandler)(server, 
// We will be using the Proxy V2 handler
aws_lambda_1.handlers.createAPIGatewayProxyEventV2RequestHandler());
