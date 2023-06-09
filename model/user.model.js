const mongoose = require("mongoose")

const {ObjectId} = mongoose.Schema.Types

const userSchema = mongoose.Schema({
    
    name: String,
    email: String,
    password: String,
    dob: Date,
    bio: String,
    posts: [{ type: ObjectId, ref: 'Post' }],
    friends: [{ type: ObjectId, ref: 'User' }],
    friendRequests: [{ type: ObjectId, ref: 'User' }]
})


const User = mongoose.model("user",userSchema)

module.exports = {
    User
}