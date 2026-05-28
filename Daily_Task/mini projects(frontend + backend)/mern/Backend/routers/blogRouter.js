const express = require("express");
const { getAllBlogs, addBlog, updateBlog, deleteBlog, getMyBlogs } = require("../controllers/blogControllers");
const checkLogin = require("../middlewares/checkLogin");
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,uniquePrefix + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

const router = express.Router();

router.get("/",getAllBlogs)
router.get("/myblogs",checkLogin,getMyBlogs)

router.post("/add",checkLogin,upload.single('image'),addBlog)

router.put("/update",checkLogin,upload.single("image"),updateBlog)

router.delete("/delete",checkLogin,deleteBlog)


module.exports = router;