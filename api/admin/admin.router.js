const {viewEnquiry,deleteEnquire,viewContact,deleteContact,viewPostController,deleteBlogController,adminLoginController} = require('./admin.controller');
const router = require('express').Router();
const {checkToken} = require("../../auth/token.validation");

// router.post()\
router.post('/',adminLoginController);
router.get('/enquiry',checkToken,viewEnquiry);
router.delete('/enquiry',checkToken,deleteEnquire);
router.get('/contact',checkToken,viewContact);
router.delete('/contact',checkToken,deleteContact);
router.get('/post',checkToken,viewPostController);
router.delete('/post',checkToken,deleteBlogController);

module.exports = router;