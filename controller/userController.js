const mongoose = require('mongoose')
const users = require('../models/userSchema')
const jwt = require('jsonwebtoken')


exports.userRegisterController =async(req,res)=>{
    try{
        const {username,email,password}=req.body
        const existingUser = await users.findOne({email,password}) //email:emailvalue,password:passwordvalue 
    if(existingUser){
        res.status(406).json("Already existing user....!")
    }else{
        const newUser =  new users({
            username,email,password
        })
        newUser.save()
        res.status(200).json(newUser)
    }
    }catch(err){
        res.status(401).json(err)

    }


}

exports.userLoginController =async(req,res)=>{
    try{
        const {email,password}=req.body
        const existingUser = await users.findOne({email,password}) //email:emailvalue,password:passwordvalue 
    if(existingUser){
        const token = jwt.sign({userId:existingUser._id},process.env.JWT_SECRETKEY)
        res.status(200).json({token,existingUser})
    }else{
        
        res.status(401).json("Invalid username or password...!")
    }
    }catch(err){
        res.status(401).json(err)

    }


    



}