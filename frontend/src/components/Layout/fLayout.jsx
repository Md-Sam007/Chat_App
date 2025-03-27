import { useEffect, useState, useRef } from "react"
import Person from "./person"
import Chats from "./chat/chats";
import Send from "./chat/send";
import Messages from "./chat/messages";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import Welpag from "./welpag";

export default function Flayout() {
    const url = "http://localhost:4000";
    const [img, setimg] = useState(null);
    const [messages, setmessage] = useState([])
    const socketRef = useRef(null);
    const [targetedId, setTarget] = useState();
    const { name } = useParams();
    const [members, setmembers] = useState();
    const [messagesCache, setMessagesCache] = useState({});

     useEffect(()=>{
              const fun=async ()=>{
                  try {
                      const result=await fetch(`${url}/members`,{method:"GET",})
                      if(result){
                          const data=await result.json();
                          
                          setmembers(data.data.filter(val=>val.name!==name))
                      }
                  }catch(e){
                      console.log(e);
                  }
  
              }
              fun();
      },[]);


    useEffect(() => {
        socketRef.current = io(url);

        socketRef.current.emit("deviceId", name);
        socketRef.current.on("receiveMessage", (msg) => {
            setmessage(prev => [...prev, msg])

        })
        return () => {
            socketRef.current.disconnect();
        }
    }, [])
    async function click(receiver, img) {
        setimg(img ? img : "https://i.pinimg.com/236x/5d/02/f7/5d02f7a385be2e52c836bd25192029dd.jpg")
        setTarget(receiver);


        if (messagesCache[receiver]) {

            setmessage(messagesCache[receiver]);
            return;

        }
        try {
            //fetching messages
            const result = await fetch(`${url}/messages`, {
                method: "GET",
                headers: {
                    reciver: receiver,
                    sender: name
                }
            })
            const data = await result.json();
            // Store new messages in cache

            setMessagesCache(prevCache => ({ ...prevCache, [receiver]: data.result.flatMap(val => val.messages) }));
            setmessage(data.result.flatMap(val => val.messages))

        } catch (e) {
            console.log(e);
        }
        if (window.innerWidth <= 500) {
            window.scrollTo({
                top: 1000,
                behavior: "smooth"
            })
        }

    }



    return (
        <div className="grid  grid-cols-1 w-screen lg:grid-cols-2 lg:w-[100%] p-2 bg-[#202c33] ">

            <div className="h-screen w-screen lg:h-[100%] lg:w-[100%] overflow-scroll no-scrollbar  p-0" >
                <div className="text-[1.6em] text-white m-4 h-[40px] flex justify-between ">
                    <div>Chats</div>
                    <a href="/">✖</a>
                </div>
                {members ? members.map((val, index) => {
                    return (

                        <Person key={index} name={val.name} img={val.img} click={() => { click(val.name, val.img) }} />

                    )
                }) :
                    <div>
                        <div className="text-[2em] text-white">
                           We Are Sorry 😔

                        </div>
                        <div className="text-[1.4em] mt-9 text-white">
                            No Members Are Availabe to chat
                        </div>

                    </div>}


            </div>
            {!targetedId ? <Welpag /> :
                <div className=" h-screen lg:h-[100%] w-full pt-14 lg:pt-1 bg-[url(https://blog.1a23.com/wp-content/uploads/sites/2/2020/02/pattern-3.svg)] bg-opacity-70 bg-center bg-cover bg-no-repeat ">


                    <Chats key="101" img={img} name={targetedId} />
                    <div className="flex flex-col h-[75vh] overflow-scroll no-scrollbar w-full ">
                        {
                            messages.filter(val => val.senderId === targetedId || val.reciverId === targetedId).map((val, index) => {
                                return (
                                    <Messages key={index} text={val.text} sender={val.senderId} name={name} />

                                )
                            })
                        }
                    </div>

                    <Send send={(send) => {
                        setmessage((prev) => ([
                            ...prev, { text: send, senderId: name, timestap: Date.now(), reciverId: targetedId }

                        ]))
                        {
                            if (socketRef) {

                                socketRef.current.emit("targetedMessage", { targetedId: targetedId, text: send, sender: name });
                            }
                        }
                    }
                    } />

                </div>


            }
        </div>
    )
}
