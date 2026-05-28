const {body} = require("express-validator");

let validator = [
    body("name")
    .notEmpty()
    .withMessage("user name must not be empty")
    .isLength({min:3,max:12})
    .withMessage("name length should be 3 to 12 char long")
    ,
    body("email")
    .notEmpty()
    .withMessage("email must not be empty")
    .isEmail()
    .withMessage("email should be a valid email")
    ,
    body("password")
    .notEmpty()
    .withMessage("password must not be empty")
    .isStrongPassword()
    .withMessage("password should be strong password")
    
]

module.exports = validator;