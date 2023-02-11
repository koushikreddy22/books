const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const jwt_key="mdsnvhjbvgvcgbnslknbfkjmxjbsdjkjvbjksdbnbjksndjvbmsdsbnsdn"
const User=mongoose.model("User")
module.exports=(req,res,next)=>{
    const {authorization}=req.headers
    console.log(authorization)
    if(!authorization){
        return res.status(402).json({error:"require 2 login"})
    }
    const token=authorization.replace("Bearer ","")
    jwt.verify(token,jwt_key,(err,payload)=>{
        if(err){
            return res.status(402).json({error:"require login"})
        }
        const {_id}=payload
        
       req.user=_id
       next()
    })
}