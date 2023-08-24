const express = require("express")
const blogRouter = express.Router()
const {BlogModel} = require("../models/blog.model")
// const {auth} = require("../middleware/auth.mw")


blogRouter.get("/blogs", async(req,res)=>{
    console.log(req.user)
       try {
          const allBlog = await BlogModel.find()
          res.send(allBlog)

       } catch (error) {
       return  res.send({"msg":error.message})

        
       }
      
})


blogRouter.post("/blogs", async(req,res)=>{
    const {title, content, category}=req.body;
    console.log(req.user)
    try {
        const userId=req.userId;
    
        const newBlog=new BlogModel({ title,content,category,username:req.user.username,date:Date(), avatar:req.user.avatar });
         await newBlog.save();
       return  res.status(200).send("A Blog has been added  succesfully")
    } catch (error) {
       return res.status(500).send({"msg":error.message});
    }
})

blogRouter.patch("/blogs/:id", async(req,res)=>{
    const {title,content}=req.body;
    const blogId=req.params.id



    try {

        const editBlog=await BlogModel.findOneAndUpdate({_id:blogId, username:req.user.username},{title,content},{new:true});
        if(!editBlog){
            return   res.status(404).send("Blog does not exist");
        }
        res.status(201).send(editBlog)
    } catch (error) {
       return res.status(500).send({"msg":error.message});
    }
})


blogRouter.delete("/blogs/:id", async(req,res)=>{
    
    try {
        const blogId=req.params.id;
        const delteBlog=await BlogModel.findOneAndDelete({_id:blogId,username:req.user.username});
        if(!delteBlog){
           return   res.status(404).send("Blog does not exist");
        }
       return res.status(404).send("Blog has been deleted successfully");
    } catch (error) {
        return res.status(500).send({"msg":error.message});
    }
})


blogRouter.patch("/blogs/:id/like", async(req,res)=>{
    
    const blogId=req.params.id;
        const userId=req.userId;

    try {
        
        const likeBlog=await BlogModel.findById(blogId);

        if(!likeBlog){
            return   res.status(404).send("Blog does not exist");
        }

        if(likeBlog.likes.includes(userId)){

            return  res.status(400).send("Blog is already liked");
        }
         likeBlog.likes.push(userId);
        await likeBlog.save();
        return res.status(200).json("Blog Liked!");
    } catch (error) {
       return res.status(500).send({"msg":error.message});
    }
})

blogRouter.patch("/blogs/:id/comment", async(req,res)=>{
    const {content}=req.body;
    const userId = req.userId
    const blogId=req.params.id;
    try {
 
    const commentBlog=await BlogModel.findById(blogId);
    if(!commentBlog){
        return   res.status(404).send("comment does not exist");
    }
    const comment={ content, username: req.user.username}
    commentBlog.comments.push(comment);
    await commentBlog.save();
    return res.status(200).json("comment added on post sucessfully");
    } catch (error) {
       
        return res.status(500).send({"msg":error.message});
    
    }
})


module.exports = { blogRouter }
