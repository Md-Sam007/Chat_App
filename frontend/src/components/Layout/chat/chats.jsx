export default function Chats(props){
    return (
        <div >
            <div className="h-[20vmin] w-full bg-yellow-50 flex gap-3 lg:h-[12vmin] lg:rounded-sm " >
                <img className="h-[70px] w-[70px] rounded-full" alt="profile Pic" src={props.img}/>
                <div className="text-[1.4em] mt-3 text-[#797777]">
                {props.name?props.name:"Chats"}
                <div className="text-[0.7em] text-[#646262]"> Last Seen</div>
                </div>
               
            </div>
            

        </div>
    )
}