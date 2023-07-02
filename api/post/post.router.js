const {viewPostController,postBlogController,deleteBlogController} = require('./post.controller');
const router = require('express').Router(); 
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './images/blog/',
    filename:(req,file,callBack)=>{
        return callBack(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage:storage,limits:{fileSize:null}});


router.get("/",viewPostController);
router.post("/",upload.fields([{name:'blog_image',maxCount: 1},{name:'writer_image',maxCount:1}]),postBlogController);
router.delete("/",deleteBlogController);
module.exports = router;