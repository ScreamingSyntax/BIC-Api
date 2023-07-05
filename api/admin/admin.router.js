const {viewEnquiry,deleteEnquire,viewContact,deleteContact,viewPostController,deleteBlogController,adminLoginController,deleteAllContactService,deleteAllEnquiry,viewPostByIDController,updateBlogController} = require('./admin.controller');
const router = require('express').Router();
const {checkToken} = require('../../token/token.validation');
const path = require('path');
const multer=require('multer');


const storage = multer.diskStorage({
    destination: './images/blog/',
    filename:(req,file,callBack)=>{
        return callBack(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage:storage,limits:{fileSize:null}});



router.post('/',adminLoginController);
router.get('/enquiry',checkToken,viewEnquiry);
router.delete('/enquiry',checkToken,deleteEnquire);
router.get('/contact',checkToken,viewContact);
router.delete('/contact',checkToken,deleteContact);
router.get('/post',checkToken,viewPostController);
router.patch("/post",upload.fields([{name:'blog_image',maxCount: 1},{name:'writer_image',maxCount:1}]),updateBlogController);
router.delete('/post',checkToken,deleteBlogController);
router.get('/clearc',checkToken,deleteAllContactService);
router.get('/cleare',checkToken,deleteAllEnquiry);
router.get("/postid",checkToken,viewPostByIDController);

module.exports = router;