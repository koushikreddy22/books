const mongoose=require('mongoose')
const bookSchema=new mongoose.Schema({
    title:{
        type:String
    },
    isbn:{
        type:String
    },
    author:{
        type:String
    },
    description:{
        type:String
    },
    published_date:{
        type:String
    },
    published_by:{
        type:String
    },
    posted_by:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
})

mongoose.model("Books",bookSchema)