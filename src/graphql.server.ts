import { ApolloServer,gql } from "apollo-server"
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core"

import {Database}  from "./config/db.connect";

import todoTask from "./models/todo.model";

// database instance creation and connection function call .
try {
  var DBConnect = new Database;
  DBConnect.DBconnect();
} catch (error) {
  console.log(`error handled at app.ts with db_connection ${error}`);
  
}


const PORT:number =  3003;
const TaskContent:String = "chnages/Adhoc";



const typeDefs = gql`
type Task{
  id:ID!
 task:String!
}

type Query{
  getTasks: [Task]
  getTask(id:ID!):Task
}

type Mutation{
  addTask(task:String!):Task
  updateTask(task:String!):Task
  deleteTask(id:ID!):Task
}

`
const resolvers = {
  Query:{
    getTasks:()=>{
      return todoTask.find({});
    },

    getTask:(id:String)=>{
      return todoTask.findById(id);
    }
  },
  Mutation:{
    addTask:(TaskContent:String)=>{
        return todoTask.create({ TaskContent });
    },
    
  }
}



const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins:[ApolloServerPluginLandingPageGraphQLPlayground()]
})



server.listen(PORT).then(({url})=>{
  console.log(`GraphQL Server ready at: ${url}`)
}).catch((err)=>console.log(`error at server creation ${err}`));
