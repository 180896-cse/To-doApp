import mongoose from "mongoose";




interface Idatabase{
    DBconnect():void;
}


export class Database implements Idatabase{
    DBconnect():void{
        var db:string = "mongodb+srv://shantanu19nagarro:Shan1234@logindb.lm4a4fh.mongodb.net/?retryWrites=true&w=majority";
        mongoose.connect(db).then(()=>{
            // return dbInstance;
            console.log("connection with DB is sucess!!");
        }).catch((err)=>{
                console.log(`Failed connection with error: ${err}`);
        })
    }
}



// const db:string = "mongodb+srv://shantanu19nagarro:Shan1234@logindb.lm4a4fh.mongodb.net/?retryWrites=true&w=majority";

// const DBconnect = (): void =>{
//     mongoose.connect(db).then(()=>{
//         // return dbInstance;
//         console.log("connection with DB is sucess!!");
//     }).catch((err)=>{
//             console.log(`Failed connection with error: ${err}`);
//     })
// };
// //class mongodbDriver
// // connect(): void


// export default DBconnect;

