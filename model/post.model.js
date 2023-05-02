const mongoose = require("mongoose")

const {ObjectId} = mongoose.Schema.Types

const postSchema = mongoose.Schema({
    
    user: { type: ObjectId, ref: 'User' },
    text: String,
    image: String,
    createdAt: Date,
    likes: [{ type: ObjectId, ref: 'User' }],
    comments: [{
      user: { type: ObjectId, ref: 'User' },
      text: String,
      createdAt: Date
    }]
})


const Post = mongoose.model("post",postSchema)

module.exports = {
    Post
}