const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const User=mongoose.model('User')
const bcrypt=require('bcrypt')
const jwt= require('jsonwebtoken')
const jwt_key="mdsnvhjbvgvcgbnslknbfkjmxjbsdjkjvbjksdbnbjksndjvbmsdsbnsdn"
router.post('/register',(req,res)=>{
    const {username,password}=req.body
    User.findOne({username}).then((saveduser)=>{
        if(saveduser){
            return res.status(422).json({error:"User already exists"})
        }
        bcrypt.hash(password,16)
        .then((hashedpassword)=>{
            const user= new User({
                username,
                password:hashedpassword
            })
            user.save().then((result)=>{
                res.send({user:result})
            }).catch((err)=>console.log(err))
        })
    }).catch((err)=>{
        console.log(err)
    })
})
router.post('/login',(req,res)=>{
    const {username,password}=req.body
    User.findOne({username}).then((saveduser)=>{
        if(!saveduser){
            return res.status(422).json({error:"User does't exists"})
        }
        bcrypt.compare(password,saveduser.password).then((domatch)=>{
            if(!domatch){
                return res.status(422).json({error:"Invalid Id or password"})
            }
            const token = jwt.sign({_id:saveduser._id},jwt_key)
             res.send({token})

        })
      
    }).catch((err)=>{
        console.log(err)
    })
    
})
module.exports=router