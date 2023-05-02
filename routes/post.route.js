const express = require("express")
const {User} = require("../model/user.model.js")
const {auth}  = require("../middleware/auth.js")
const {Post} = require("../model/post.model.js")

const postRouter = express.Router()

postRouter.get("/posts",async (req,res)=>{

    const post = await Post.find()
    res.send(post)
})

postRouter.post("/newpost",auth,async(req,res)=>{

    const {text,image} = req.body

    const Userid = req.body.Userid
    const post = new Post({user:Userid,text,image})

    res.send("post has been created")
})

postRouter.patch("/posts/:id",auth,async(req,res)=>{

    const {text,image} = req.body
    const Userid = req.body.Userid
    const postid = req.params.id

    const post = await Post.findOne({_id:postid,user:Userid})

    await post.save()
    res.send("post has been updated")

})

postRouter.delete("/posts/delete/:id",auth,async(req,res)=>{

    const postid = req.params.id
    const Userid = req.body.Userid

   await Post.findByIdAndDelete(postid)

   res.send("post deleted")


})



module.exports = {
    postRouter
}