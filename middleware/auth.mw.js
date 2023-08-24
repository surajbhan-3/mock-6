const  jwt  = require("jsonwebtoken")
require("dotenv").config();
const skey = process.env.SECRET

const auth = (req,res,next)=>{

      const token = req.headers.authorization.split(" ")[1]
      // console.log(token)

      if(token){
        
        jwt.verify(token,skey, function (err,decoded){
            if(err){
              console.log(err)
                res.status(401).send({"msg":"login first"})
            }else{
                req.user =decoded;
                
                next();
            }
        })
      }else{
        res.status(401).send({"msg":"login first"})
      }
}


module.exports = {auth}
