const {postContact:postContactService,} = require("./contact.service");
const { json } = require("json");

module.exports = {
  postContact: (req,res)=>{
    const data = req.body;
    console.log(data)
    postContactService(data,(err,result)=>{
      console.log(result)
        if(err){
            return res.json({
                success:0,
                message:"Error Adding Contact Details"
            });
        }
        return res.json({
            success:1,
            message:"Successfully Added Contact Details"
        })
    })
  },
};
