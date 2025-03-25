import { Users } from "./usersDb.js";
import bcrypt, { compare } from "bcryptjs";
import dotnet from "dotenv";
import jwt from "jsonwebtoken";
import { People } from "./usersDb.js";
import { messages } from "./messages.js";

// Adjust according to your project structure


const registration = async (req, res, next) => {
    
    try {


        const { username, password, name } = req.body;
        const existingUser = await Users.findOne({ username });
        const existingName=await Users.findOne({name})

        if (existingUser ||existingName) {

            return res.status(409).json({ message: "User already exists" });
        }
        

        const hashedPassword = await bcrypt.hash(password, 10);
        await Users.create({ username, password: hashedPassword, name });
        await People.create({name:name,img:""});


        return res.status(201).json({ message: "New user registered successfully" });

    } catch (error) {

        if (!res.headersSent) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

const loginValidation = async (req, res) => {
    dotnet.config();
    
    const { username, password } = req.body;
    try {
        const result = await Users.findOne({ username: username })
        if (result) {
            const isCompare = await bcrypt.compare(password, result.password);
            console.log(isCompare);
            if (!isCompare) {
                return res.status(401).json({ message: "Wrong Password" });
            }
        
            const jwtToken = jwt.sign({ username: result.username }, process.env.JWT_SCRTE,{ expiresIn: "24h" });
       
            return res.status(201).json({ message: "Login SuccessFull", jwtToken: jwtToken,name:result.name });


        }
        else {
            return res.status(404).json("Wrong Email")
        }

    }catch(e){
        return res.status(501).json({message:"Internal Server Error"});
    }
    
}

const members=async(req,res)=>{
    try{
        const result=await People.find({});
       
        
        res.status(201).json({message:"data retrive from data base",data:result});

    }catch(e){
        console.log(e)
    }
}


export { registration,loginValidation,members };
