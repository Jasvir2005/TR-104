const mongoose = require("mongoose");

let blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },

    image: {
        type: String,
    },
    
    publicId:{
        type: String,
    },
    
    author: {
        type: String,
        required: true
    },

    userId:{
        type:mongoose.Schema.ObjectId,
        required: true
    },

},{
    timestamps:true,
})

let Blogs = mongoose.model("blogs", blogSchema);

module.exports = Blogs;