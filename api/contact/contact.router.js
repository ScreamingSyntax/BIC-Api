const {postContact:postContactController} = require("./contact.controller");
const router = require('express').Router();

router.post("/",postContactController);

module.exports = router;