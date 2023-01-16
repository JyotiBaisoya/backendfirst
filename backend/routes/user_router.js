const express = require("express");
const {UserModel} = require("../models/usermodel")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const userRouter = express.Router()
require("dotenv").config()


userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password} = req.body
    try {
        bcrypt.hash(password,4,async(err,hash)=>{
          if (err){
            console.log(error)
          }else{
            const user =  new UserModel({name,email,gender,password:hash})
            await user.save()
            res.send("registered")
          }
        })
        
    } catch (error) {
        console.log(error);
        res.send("something went wrong")
    }
    
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.find({email})
        if(user.length>0){
            const token = jwt.sign({ userID: user[0]._id }, process.env.key)
            res.send({"msg":"logged in","token":token})
        }else{
            res.send("wrong credentials")
        }
    } catch (error) {
        console.log(error);
        res.send("something went wrong")
    }

})

module.exports = {userRouter}