
const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {User} = require("../model/user.model.js")

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

module.exports = {userRouter}



