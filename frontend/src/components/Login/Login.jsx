import { useState } from "react"
import axios from "axios";  
import {ToastContainer,toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const url="http://localhost:4000";
    const navigate=useNavigate();
    const [value,setvalue]=useState({
        username:"",
        password:""
    });
    const notify=(val)=>{toast(val,{position:"top-center",type:"error" ,theme:"colored"})}
    async function  action(){
        try{
            const result =await axios.post(url,value,
                {headers: { "Content-Type": "application/json" }}
            )
            if(result){
                
                navigate(`/Chat/${result.data.jwtToken}/${result.data.name}`);
            }else{
                notify("Internal Server Error")
            }
        }
        catch(e){
            if(e.response){
                notify(e.response.data.message)
            }
            else {
                notify("Internal Server Error")
            }
            console.log(e);
        }
        
        
    }
    

   
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="h-[450px] w-[890px] border border-solid rounded-[20px] max-sm:w-[330px] max-sm:h-[400px] p-[15px] flex max-sm:flex-col gap-[30px] border-black/50 shadow-[10px_20px_50px_10px] shadow-[#aaaaaa]" >
                <div >
                    <div className="text-center text-[2em] font-sans">
                        Log In
                    </div>
                    <form action={action}>

                        <div className="inputs h-[200px] w-[400px] max-sm:w-[300px] flex flex-col">
                            <input className="h-[40px] outline-none rounded-md border-none font-[1.4em] p-[20px] bg-[#DCDCDC]" placeholder="Username" name="username" onChange={(e)=>{
                                setvalue((prev)=>{
                                    return {...prev,username:e.target.value}

                                })}}
                                />
                            <input  className="h-[40px] outline-none border-none rounded-md mt-[30px] font-[1.4em] p-[20px] bg-[#DCDCDC]" placeholder="Password" name="password" type="password" onChange={(e)=>{
                                setvalue((prev)=>{
                                    return {...prev,password:e.target.value}

                                })}} />
                            <button className="mt-[40px] hover:text-red hover:cursor-pointer h-[40px] outline-none border-none bg-black text-white font-[1.2em] rounded-[25px]" 
                            >Submit</button>
                        </div>

                        <div className="text-center mt-[40px] font-[1.2em]">
                            <a  className=" hover:text-red-700 " href="./SignUp">Sing Up</a>
                        </div>
                    </form>



                </div>
                <div >
                {window.innerWidth>500? <img class="LoginImage h-[410px] w-[460px] rounded-[20px] " src="https://media.istockphoto.com/id/1475054812/photo/robot-hand-making-contact-with-human-finger-on-dark-blue-background-business-communication.jpg?s=612x612&w=0&k=20&c=XnFBm3qvApmT-jxHXQOh5Gl9ws-6FbV-ZWiXF3i0a2Q=" alt="world" />:""}

                </div>

            </div>

        <ToastContainer/>

        </div>

    )
}