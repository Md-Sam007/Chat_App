import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 


const connectDb=async()=>{
    console.log(process.env.MONGO_DB);
    try{
        
        const result = await mongoose.connect(`${process.env.MONGO_DB}/Chat`,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
    }catch(e){
        console.log(e)
    }
}
export {connectDb};