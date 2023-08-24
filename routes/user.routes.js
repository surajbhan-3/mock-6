const express = require("express")
const userRouter = express.Router()
const {UserModel} = require("../models/user.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const skey = process.env.SECRET

// userRouter.get("/get_data", (req,res)=>{
//     res.send("ehllo")
// })

userRouter.post("/register", async(req,res)=>{
const {username, avatar, email, password} = req.body;

        try {
             isUserPresent = await UserModel.findOne({email:email});
             if(isUserPresent){
                return res.status(200).send({"msg":"Please Login Your are already Registered"})
             }
             const hasPassword = bcrypt.hashSync(password, 8);
             const userRegister = new UserModel({"username":username, "avatar":avatar, "email":email, "password":hasPassword})
             await userRegister.save()
             return res.status(201).send({"msg":"User registered successfuly"})             
        } catch (error) {
            
            return res.status(500).send({"msg":error.message})
        }
})




userRouter.post("/login", async(req,res)=>{
    const {email, password} = req.body;


    try {
        const loginUser = await UserModel.findOne({email:email})
        console.log(loginUser,"hdfl")
        if(!loginUser){
            res.status(401).send({"msg":"Your are not a registered user"})
        }
        const isUserPassword = bcrypt.compare(password, loginUser.password)
        if(!isUserPassword){
            return res.status(401).send({"msg":"Wrong Credential"})
        }
        const token = jwt.sign({userId:loginUser._id, email:loginUser.email,username:loginUser.username, avatar:loginUser.avatar},skey)
        return res.status(201).send({"msg":"User Login successfully",token:token})
        
    } catch (error) {
        return res.status(500).send({"msg":error.message})
    }
})


module.exports = {userRouter}


