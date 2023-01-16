
const express = require("express");
const { PostModel } = require("../models/postmodel");

const postRouter = express.Router();

postRouter.get("/",async(req,res)=>{
  
    try {
       const query = await PostModel.find()
       res.send(JSON.stringify(query))
    } catch (error) {
        console.log(error)
        res.send("something went wrong")
    } 
})


postRouter.post("/create",async(req,res)=>{
    const payload = req.body
    try {
       const post = new PostModel(payload) 
       await post.save()
       res.send("post created")
    } catch (error) {
        console.log(error)
        res.send("something went wrong")
    }
})
postRouter.patch("/update/:postID",async(req,res)=>{
    const payload = req.body
    const postID = req.params.postID
    const post = await PostModel.findOne({"_id":postID});
    const user_id_in_post = post.userID
    const user_id_for_update = req.body.userID
    try {
        if(user_id_in_post!=user_id_for_update){
            res.send("you are not authorised")
        }else{
            const query = await PostModel.findByIdAndUpdate({"_id":postID},payload)
            res.send("updated")
        }
    } catch (error) {
        console.log(error)
        res.send("something went wrong")
    }
})
postRouter.post("/delete/:postID",async(req,res)=>{
    
    const postID = req.params.postID
    const post = await PostModel.findOne({"_id":postID});
    const user_id_in_post = post.userID
    const user_id_for_update = req.body.userID
    try {
        if(user_id_in_post!=user_id_for_update){
            res.send("you are not authorised")
        }else{
            const query = await PostModel.findByIdAndDelete({"_id":postID})
            res.send("updated")
        }
    } catch (error) {
        console.log(error)
        res.send("something went wrong")
    }
})

module.exports={postRouter}