import AWS, { Config } from "aws-sdk";
// import { ApolloServer } from "apollo-server";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";
import path from "path";
import { Database } from "./config/db.connect";
import todoTask from "./models/todo.model";

//reading data from .env file
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });



// Mongo DB database instance creation and connection function call .
try {
  var DBConnect = new Database();
  DBConnect.DBconnect();
} catch (error) {
  console.log(`error handled at app.ts with db_connection ${error}`);
}

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
const getTask = async (parents: any, args: any) => {
  return await todoTask.findById(args.id);
};

const resolvers = {
  Query: {
    getTasks: async () => {
      return await todoTask.find({});
    },

    getTask: getTask,
  },
  Mutation: {
    addTask: async (parents: any, args: any) => {
      return await todoTask
        .create({ task: args.task })
        .catch((err) => console.log(`error at Add Task ${err}`));
    },
    updateTask: async (parents: any, args: any) => {
      return await todoTask.findOneAndUpdate(
        { _id: args.id },
        { $set: { task: args.task } },
        { new: true }
      );
    },
    deleteTask: async (parent: any, args: any) => {
      return await todoTask
        .findByIdAndDelete(args.id)
        .catch((err) => console.log(`error at Delete Task operation ${err}`));
    },
  },
};

const Aserver:ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== "production",
  // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});



// const PORT = process.env.PORT;
// server
// .listen(PORT)
// .then(({ url }) => {
//   console.log(`GraphQL Server ready at: ${url}`);
// })
// .catch((err) => console.log(`error at server creation ${err}`));






// This final export for serverless
export const graphqlHandler = startServerAndCreateLambdaHandler(
  Aserver,
  // We will be using the Proxy V2 handler
  handlers.createAPIGatewayProxyEventV2RequestHandler()
);
