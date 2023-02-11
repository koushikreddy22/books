const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const requirelogin=require('../middleware/requirelogin')
const Book=mongoose.model("Books")

router.post('/addbook',requirelogin,(req,res)=>{
    const { title,isbn,author,description,pusblished_date,published_by}=req.body
    const book= new Book({
        title,
        isbn,
        author,
        description,
        pusblished_date,
        published_by,
        posted_by:req.user
    })
    book.save().then((result)=>{
        res.send({book:result})
    })

})
router.get('/getbook',requirelogin,(req,res)=>{
    Book.find({posted_by:req.user}).then((data)=>{
        res.send({data})
    })
})
router.post('/update',requirelogin,(req,res)=>{
    const {_id,title,isbn,author,description,pusblished_date,published_by}=req.body
    Book.updateOne({_id,posted_by:req.user},{
        title,isbn,author,description,pusblished_date,published_by
    }).then((data)=>{
        res.send({data})
    })
})
router.delete('/delete',requirelogin,(req,res)=>{
    const {_id}=req.body
    Book.deleteOne({_id,posted_by:req.user}).then((data)=>{
        res.send(data)
    })
})
module.exports=router