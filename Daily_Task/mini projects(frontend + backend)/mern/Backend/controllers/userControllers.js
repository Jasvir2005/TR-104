const Users = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { json } = require("express");
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");

let getAllUser = async(req,res)=>{
    let data = await Users.find();
    //res.send(data);
    res.status(400).send("you are not allowed to see all users data");
}

let verifyToken = async(req,res)=>{
    try{
            let header = req.headers.authorization;
    
            if(!header){
               return res.status(401).send("no header provided");
            }
            let token = header.split(" ")[1];
    
            if(!token){
               return res.status(401).send("no token provided");
            }
            let {userId} = jwt.verify(token,process.env.JWT_SECRET);
            let user = await Users.findById(userId)
            res.send(user)
    
        }catch(error){
            res.status(500).send(error)
        }
}

const registerUser = async(req,res)=>{

    let result = validationResult(req);
    let errors = result.errors;

    if(errors.length!=0){
        let err = errors.map((er)=>er.msg)
        return res.status(400).send(err[0])
    }

    let data = req.body;

    let existingUser = await Users.findOne({email: data.email});
    if(existingUser){
        return res.status(400).status(409).send("user already exists with this email")
    }

    if(data.password.length < 6){
        return res.status(400).send("password must be at least 6 characters long");
    }
    //let newUser = await Users.create(data);
    let hashPassword = bcrypt.hashSync(data.password, 10);

    let newUser = await Users.create({...data,password:hashPassword});
    res.send(newUser)
}

const loginUser = async(req,res)=>{
    let data = req.body;
    let existingUser = await Users.findOne({email: data.email});
    if(!existingUser){
        return res.status(404).send("no user found please register first")
    }
    let isPasswordCorrect = bcrypt.compareSync(data.password, existingUser.password);
    if(!isPasswordCorrect){
    //if(data.password!=existingUser.password){
        return res.status(401).send("Wrong password")
    }
    let token = jwt.sign({userId:existingUser._id},"thisisyoursecretkey")
    res.send({existingUser, token});
};

const updateUser = async(req,res)=>{
    let id = req.query.id;
    let data = req.body;
    let updatedUser = await Users.findByIdAndUpdate(id,data,{new:true});
    res.status(200).send(updatedUser);
}

const deleteUser = async(req,res)=>{
    let id = req.query.id;
    let deletedUser = await Users.findByIdAndDelete(id);
    if(!deletedUser){
        return res.status(404).send("no user found to delete")
    }
    res.status(200).send("user deleted")
}

module.exports = {getAllUser,registerUser,updateUser,deleteUser,loginUser,verifyToken}