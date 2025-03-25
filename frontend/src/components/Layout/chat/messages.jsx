export default  function Messages(props){

    return (
        
        <div className={` ml-1 mr-1 mt-2 min-w-[40px] max-w-[40%] text-white  p-3 ${props.sender===props.name?"bg-[#247835] self-end":"bg-[#353232] self-start"}  rounded-lg break-words `}>
        <span className="block text-lg">{props.text}</span>
        </div>
    )
}