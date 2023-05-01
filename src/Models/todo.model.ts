// This file contain schema of to-do db
import mongooes,{ Schema, model,} from "mongoose";


//interface for schema
interface Itask {
    task: string,
}

const todoSchema = new Schema<Itask>({
    task:{
        type: String,
        required:[true," Task is mandatory input"]
    }
});

const DBconnect = model<Itask>("todo", todoSchema);

export default  DBconnect;