const router = require("express").Router();
const {submitEnquiry} = require("./enquiry.controller");

router.post("/",submitEnquiry);

module.exports = router;