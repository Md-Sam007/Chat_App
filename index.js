import express from "express";
import { createServer } from "http";
import cors from "cors";

import { Validation } from "./validation/validation.js";
import { connectDb } from "./mongoose/db.js";

import { Server } from "socket.io";
import { registration } from "./mongoose/regitration.js";
import { loginValidation } from "./mongoose/regitration.js";
import { members } from "./mongoose/regitration.js";
import { messages } from "./mongoose/messages.js";
import { Socket } from "./sockets/Socket.js";

const app = express();
const server = createServer(app);
connectDb();
app.use(express.json());
app.use(cors({
  origin:"http://localhost:3000",
  methods:["GET","POST"],
}))
const io=new Server(server,{
  cors:{
    origin:"http://localhost:3000",
    methods:["GET","POST"],
  },
  connectionStateRecovery:{}
});
app.post("/",Validation,loginValidation);
app.post("/signUp",Validation,registration);
app.get("/members",members);

app.get("/messages",messages);

io.on('connection',(socket)=>{
  Socket(io,socket);
})

server.listen(4000, () => {
  console.log("Server started at port 4000");
});
