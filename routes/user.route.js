
const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {User} = require("../model/user.model.js")
const {auth}  = require("../middleware/auth.js")

require('dotenv').config()

const userRouter = express.Router()

userRouter.post("/register", async (req,res)=>{

    let {name,email,password,dob,bio} = req.body

try {

    bcrypt.hash(password, 8, async function(err, hash) {
        // Store hash in your password DB.

        if(err){
            res.send("some error occurred while registering")
        }else{

            const user = new User({name,email,dob,bio,password:hash})

            await user.save()
            res.send("registration sucessfull")
        }
    });
    

} catch (error) {

    console.log(error)
    
}
    
})


userRouter.post("/login",async(req,res)=>{

    const {email,password} = req.body
try {

    const user = await User.findOne({email})
    //console.log(user)

    if(user){
        bcrypt.compare(password, user.password, function(err, result) {
            // result == false
            if(result){
                const token = jwt.sign({ "Userid":user._id }, process.env.secret);
                res.send({"msg":"login sucessfull","token":token})
            }
        });
    }
    
} catch (error) {
    console.log(error)
}

})


userRouter.get("/users",async (req,res)=>{

    const users = await User.find()

    res.send(users)
})

userRouter.get("/users/:id/friends",async(req,res)=>{

    const id = req.params.id

    const user = await User.findById(id)

    if(user){
        res.send(user.friends)
    }


})

userRouter.post("/users/:id/friend_request",auth,async(req,res)=>{

    const id = req.params.id
    const Userid = req.body
    //console.log(Userid.Userid)
    
   if(id==Userid.Userid){
    res.send("cant send request to ypurself")
   }

   const friend = await User.findById(id)

   friend.friendRequests.push(Userid.Userid)

   await friend.save()

   res.send("friend request sent")



})


userRouter.put("/users/:id/friends/:friendId",async (req,res)=>{

const id = req.params.id

const freindid = req.params.friendId

const user = await User.findById(id)

let {request} = req.body

if(request=="reject"){
    res.send("rejected")
}

if(!user){
    res.send("user not found")
}

if(request=="accept"){
    user.friends.push(freindid)
    await user.save()


    res.send("accepted")
}





})
module.exports = {userRouter}



