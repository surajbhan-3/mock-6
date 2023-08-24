const express = require("express")
const cors = require("cors")
const {connection} = require("./config/db")
const {userRouter} = require("./routes/user.routes")
const {auth} = require("./middleware/auth.mw")
const {blogRouter}= require("./routes/blog.routes")
require("dotenv").config()



const app = express()

app.use(express.json())
app.use(cors())


app.get("/", async(req, res)=>{

       try {
         res.status(200).send("Welcom to blogs homepage")
       } catch (error) {
         res.status(500).send({"msg":error.message})
       }
})

app.use("/api", userRouter)
app.use("/api", auth, blogRouter)


app.listen(process.env.PORT, async (req,res)=>{

       try {
        await connection
        console.log("Database is connected")
       } catch (error) {
        console.log(error)
       }

       console.log("Server is running at port 4500")
})