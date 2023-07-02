const router = require("express").Router();
const {viewEnquiry,submitEnquiry,deleteEnquire} = require("./enquiry.controller");

router.get("/",viewEnquiry);
router.post("/",submitEnquiry);
router.delete("/",deleteEnquire);

module.exports = router;