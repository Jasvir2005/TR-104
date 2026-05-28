//console.log("hello world")

//alert prompt confirm document window console fetch

//alert("hello")

//console.log(process)

//console.log(global)

//1. custome module
//2. builtIn module
//3. third party module

    //let {add,sub} = require('./math.js')

    //const os = require("os")

    //console.log(os.hostname())
    //console.log(os.homedir())
    //console.log(os.type())
    //console.log(os.version())
    //console.log(os.arch())
    //console.log(os.totalmem())
    //console.log(os.freemem())

//console.log(add(10,20))

    //const path = require("path");

    // home/files/sem1/text.txt => home/files/../files/sem1/text.txt

    //console.log(path.sep)

    //let res = path.join("home","files","sem1","text.txt")

    //console.log(res)

    //console.log( path.join("home","files","sem1","text.txt"))
    //console.log( path.join("home","files","..","files","sem1","text.txt"))
    //console.log( path.resolve("home","files","..","files","sem1","text.txt"))

    //console.log(path.basename("home/files/sem1/text.txt"))
    //console.log(path.dirname("home/files/sem1/text.txt"))
    //console.log(path.extname("home/files/sem1/text.txt"))

//const fs = require("fs")

//let data = fs.readFileSync("./sample.txt",'utf-8');
//console.log(data)


//fs.writeFileSync("./temp/sample.txt","this is sample file")
//fs.appendFileSync("./sample.txt","this is sample file")

//if(fs.existsSync("./temp/sample.txt")){
//    fs.unlinkSync("./temp/sample.txt")
//}
//else{
//    console.log("no such file exist")
//}

//const fs = require("fs").promises;
//console.log("before")
//fs.readFile('./temp/sample.txt',"utf-8",(err,data)=>{
//    if(err){
//        console.log(err)
//    }
//    else{
//        console.log(data)
//    }
//})
//console.log("after")

//fs.readFile("./temp/sample.txt","utf-8")
//.then((data)=>console.log(data))
//.catch((err)=>console.log(err))

//const fs = require("fs")
//let home = fs.readFileSync("./temp/home.html","utf-8")
//let about = fs.readFileSync("./temp/about.html","utf-8")
//let contact = fs.readFileSync("./temp/contact.html","utf-8")
//let homecss = fs.readFileSync("./temp/home.css","utf-8")

//const http = require("http");

//const server = http.createServer();

//server.on("request",(req,res)=>{
    //res.end("server is running")
    //if(req.url=='/'){
    //    res.end(home)
    //}
    //else if(req.url=='/about'){
    //    res.end(about)
    //}
    //else if(req.url=='/contact'){
    //    res.end(contact)
    //}
    //else if(req.url=='/home.css'){
    //    res.end(homecss)
    //}
//})

//server.listen(3000,()=>console.log("server is listening on port 3000"))

//const express = require("express");

//const server = express();

//server.get("/",(req,res)=>{
//    res.send("this is home page")
//})

//server.get("/about",(req,res)=>{
//    res.send("this is about page")
//})

//server.listen(3000,()=>console.log("server is listening on port 3000"))
require("dotenv").config();
const express = require('express');
const fs = require('fs');
const userRouter = require('./routers/userRouter');
const blogRouter = require('./routers/blogRouter');
const mongoose = require("mongoose");
const cors = require("cors");

//let home = fs.readFileSync('./temp/home.html','utf-8');

const app = express();
app.use(cors());
app.use(express.json());

//app.use(express.static("public"));

//function firstMiddleware(req,res,next){
    //console.log("you are in first middleware");
    //let data = req.body;
    //if(data.age<18){
    //    return res.send("you are not allowed to register")
    //}
    //next();
//}

//function secondMiddleware(req,res,next){
    //console.log("you are in second middleware");
    //next();
//}

// app.use(firstMiddleware)
app.use('/user',userRouter);
app.use("/blog",blogRouter);

app.get('/',(req,res)=>{
    res.send("server is running");
});

mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log("connected to mongoDB");
})

app.listen(3000,()=>{
    console.log('server is running on port 3000');
});


// show dbs => to show all the databases
// use <db name> => to use the database or to create the database if it does not exist
// db.dropDatabase() => to drop the database
// show collections => to show all the collections in the database
// db.createCollection("<collection name>") => to create a collection
// db.<collectionname>.drop() => to drop the collection
// db.<collectionname>.insertOne({}) => to insert a document in the collection
// db.<collectionname>.insertMany([{}, {}, {}]) => to insert multiple documents in the collection
// db.<collectionname>.find() => to find all the documents in the collection
// db.<collectionname>.find({}) => to find all the documents in the collection
// db.<collectionname>.find({<field name>: <value>}) => to find the documents in the collection based on the field name and value
// db.<collectionname>.updateOne({<field name>: <value>}, {$set: {<field name>: <value>}}) => to update a document in the collection based on the field name and value
// db.<collectionname>.updateMany({<field name>: <value>}, {$set: {<field name>: <value>}}) => to update multiple documents in the collection based on the field name and value
// db.<collectionname>.deleteOne({<field name>: <value>}) => to delete a document in the collection based on the field name and value
// db.<collectionname>.deleteMany({<field name>: <value>}) => to delete multiple documents in the collection based on the field name and value