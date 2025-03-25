
import mongoose from "mongoose";
const UsersSchema=new mongoose.Schema({
    name:String,
    username:String,
    password:String,
    
})

const Users=mongoose.model("user",UsersSchema);

const PeopleSchema= new mongoose.Schema({
    name:String,
    img:String,

})
const People=mongoose.model("people",PeopleSchema);


const MessagesSchema=new mongoose.Schema({
    chatId:String,
    messages:Array

})
const Messages=mongoose.model("message",MessagesSchema);
export {Users,People,Messages};