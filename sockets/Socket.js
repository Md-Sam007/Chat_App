
import { Messages } from "../mongoose/usersDb.js"
const connectedDevices = {}
const Socket = (io,socket) => {
  socket.on('deviceId', (deviceId, msg) => {
    connectedDevices[deviceId] = socket.id
    

  })
  socket.on("targetedMessage", async ({ targetedId, text, sender }) => {
    const targetSocketId = connectedDevices[targetedId];
    
    
    //check if devices are connected with targetSocketId
    if (targetSocketId) {

      io.to(targetSocketId).emit("receiveMessage", { msg: "incomming", text, senderId: sender });
      await Messages.updateOne({ chatId: {$regex:sender,$options:"i"}  }, { $push: { messages: { senderId: sender, reciverId: targetedId, msg: "incomming", text: text } } })
      
    } else {
      //if devices are not connected 
      try {
        const result = await Messages.find({ chatId: {$regex:sender,$options:"i"} })
        if (! result.length) {
          
          await Messages.insertOne({ chatId: sender + "_" + targetedId, messages: [{ senderId: sender, reciverId: targetedId, msg: "incomming", text: text }] });

        } else {
          await Messages.updateOne({ chatId: {$regex:sender,$options:"i"}  }, { $push: { messages: { senderId: sender, reciverId: targetedId, msg: "incomming", text: text } } })
        }
      } catch (e) {
        console.log(e);
      }
      
    }
  })

  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id} with device`);
  });

}
export { Socket };