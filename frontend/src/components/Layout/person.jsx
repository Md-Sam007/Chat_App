export default function Person(props){
    return(
        <div className="mt-[20px] w-[96%] lg:w-[98%] overflow-hidden hover:cursor-pointer " onClick={props.click}>
                     <div className="h-[10vh] ml-[10px] flex gap-5  ">
                       <img className="h-[70px] w-[70px] rounded-full" alt="profile Pic" src={props.img?props.img:"https://i.pinimg.com/236x/5d/02/f7/5d02f7a385be2e52c836bd25192029dd.jpg"}/>
                        <div className="h-full w-full">
                            <div className=" border-white border-t-2 opacity-20"></div>
                            <div className="text-[1.3em] text-white hover:text-red-500 mt-1">
                                {props.name}
                            </div>
                            <div className="text-[1em] text-[#646262]">Press TO Chat</div>
                        </div>  
                     </div>
                


                </div>
    
    )
}