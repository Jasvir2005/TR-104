const Blogs = require("../models/blogModel");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const jwt = require("jsonwebtoken");

let getAllBlogs = async (req, res) => {
    let data = await Blogs.find();
    res.status(200).send(data);
};

let getMyBlogs = async(req,res)=>{
    let userId = req.userId;
    let data = await Blogs.find({userId});
    res.send(data);
};

const addBlog = async (req, res) => {
try{

    let result = await cloudinary.uploader.upload(req.file.path)
    fs.unlinkSync(req.file.path)
    

    let data = req.body;

    let userId = req.userId;

    let newBlog = await Blogs.create({...data,userId,image:result.url,publicId:result.public_id});
    res.status(201).send(newBlog);

}catch(error){
    res.status(500).send(error)
}
};

const updateBlog = async (req,res)=>{
try{

let id = req.query.id;

let blog = await Blogs.findById(id);

let data = req.body;

if(req.file){

// delete old image
await cloudinary.uploader.destroy(blog.publicId)

// upload new image
let result = await cloudinary.uploader.upload(req.file.path)

fs.unlinkSync(req.file.path)

data.image = result.url
data.publicId = result.public_id

}

let updatedBlog = await Blogs.findByIdAndUpdate(id,data,{new:true})

res.status(200).send(updatedBlog)

}catch(error){
console.log(error)
res.status(500).send(error)
}

}

const deleteBlog = async (req, res) => {
    let id = req.query.id;
    let publicId = req.query.publicid;

    await cloudinary.uploader.destroy(publicId)

    let deletedBlog = await Blogs.findByIdAndDelete(id);

    if (!deletedBlog) {
        return res.status(404).send("No Blog found to delete");
    }

    res.status(200).send("Blog deleted");
};

module.exports = {getAllBlogs,addBlog,updateBlog,deleteBlog,getMyBlogs};