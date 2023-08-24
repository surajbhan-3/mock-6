const mongoose = require("mongoose")


const blogSchema = mongoose.Schema({
       
      username:{type:String, required:true},
      avatar:{type:String, required:true},
      title:{type:String, required:true},
      content:{type:String, required:true},
      category:{type:String, required:true},
      date:{type:Date, required:true},
      likes:{type:Number, default:0},
      comments:[
            {
                  username: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
                  content: { type: String, required: true },
                }
      ]


})

const BlogModel = mongoose.model("blog", blogSchema)

module.exports = {BlogModel}