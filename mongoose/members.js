import {People} from "./usersDb";
const members=async(req,res)=>{
    try{
        const result=await People.find({});
        res.status(201).json({message:"data retrive from data base",data:result});

    }catch(e){
        console.log(e)
    }
}
export {members};