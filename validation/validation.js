import Joi from "joi";

const Validation=(req,res,next)=>{
      console.log(req.body);
    const Schema =Joi.object({
        username:Joi.string().min(4).email().required(),
        password:Joi.string().alphanum().min(6).max(20).required(),
        name:Joi.string().min(4).max(8)
        
    })
    const {error}=Schema.validate(req.body);
    
    if(error){
        console.log("validation failed",error.details[0].message);
        return res.status(400).json({message:`Error ${error.details[0].message}`})
    }
    
    next();
    
}
export {Validation};