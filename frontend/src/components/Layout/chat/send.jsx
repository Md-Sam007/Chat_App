import { useState } from "react"
export default function Send(props){
    const [UserValue,setValue]=useState(" ");
    const send=()=>{
        props.send(UserValue);
        setValue("")
    }
    return (
        <div className="h-[16vmin] w-full bg-[#343f46] lg:h-[10vmin] lg:p-5  p-4">
            <form action={send}>
            <input className="border-none ml-3 h-[9vmin] w-[70vmin] lg:ml-8 lg:w-[80vmin] rounded-lg lg:h-[6vmin] outline-none text-[1.2em] " value={UserValue} onChange={(e)=>{setValue(e.target.value)}} />
            <button className="fa text-[1.3em] ml-5 lg:ml-[4vmin] lg:text-[1.8em]  lg:hover:text-red-600 hover:cursor-pointer" >
            &#xf1d8;
            </button>
            </form>
        </div>
    )
}

