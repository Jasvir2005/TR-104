const jwt = require("jsonwebtoken");

function checkLogin(req,res,next){
    try{
        let header = req.headers.authorization;

        if(!header){
           return res.status(401).send("no header provided");
        }
        let token = header.split(" ")[1];

        if(!token){
           return res.status(401).send("no token provided");
        }
        let {userId}=jwt.verify(token,"thisisyoursecretkey")
        req.userId = userId;
        next();

    }catch(error){
        res.status(500).send(error)
    }
};

module.exports = checkLogin;