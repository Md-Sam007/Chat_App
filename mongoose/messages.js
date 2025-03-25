import { Messages } from "./usersDb.js"
const messages=async (req,res)=>{
    const {reciver,sender}=req.headers;
    try{
        const result=await Messages.find({chatId:{$regex:sender,$options:"i"}});
      
        res.status(201).json({result});

    }catch(e){
        console.log(e)
    }
    
}
export {messages}