const express = require("express");
const validator = require("../middlewares/validator");
const { getAllUser, registerUser, updateUser, deleteUser, loginUser, verifyToken } = require("../controllers/userControllers");

const router = express.Router();

router.get("/",getAllUser);
router.get("/verify",verifyToken);

router.post("/register",validator,registerUser);

router.post("/login",loginUser);

router.put("/update",updateUser);

router.delete("/delete",deleteUser);


module.exports = router;