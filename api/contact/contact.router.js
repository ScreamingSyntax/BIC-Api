const {viewContact:viewContactController,postContact:postContactController,deleteContact:deleteContactController} = require("./contact.controller");
const router = require('express').Router();

router.get("/",viewContactController);
router.post("/",postContactController);
router.delete("/",deleteContactController);
module.exports = router;