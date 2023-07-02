const { viewContact: viewContactService ,postContact:postContactService,viewAvailability:viewAvailabilityService,deleteContact:deleteContactService} = require("./contact.service");
const { json } = require("json");

module.exports = {
  viewContact: (req, res) => {
    viewContactService((err, result) => {
      if (err) {
        return res.json({
          success: 0,
          message: "Error fetching contact-list",
        });
      }
      else if(result[0]==undefined){
        return res.json({
          success:0,
          message:"No Contacts to View"
        })
      }
      // console.log(result[0])
      // if(result)
      return res.json({
        success: 1,
        data: result,
      });
    });
  },
  postContact: (req,res)=>{
    const data = req.body;
    postContactService(data,(err,result)=>{
        if(err){
            return res.json({
                success:0,
                message:"Error Adding Contact Details"
            });
        }
        return res.json({
            success:1,
            data:"Successfully Added Contact Details"
        })
    })
  },
  deleteContact:(req,res)=>{
    const data = req.body;
    viewAvailabilityService(data,(err,result)=>{
        console.log(result)
        if(result[0]===undefined){
            return res.json({
                success:0,
                message:"The contact you are trying to delete doesn't exist"
            })
        }
        else{
            deleteContactService(data,(err,result)=>{
                if(err){
                    return res.json({
                        success:0,
                        message:"Error Deleting Contact Details"
                    });
                }
                return res.json({
                    success:1,
                    data:"Successfully Delted Contact Details"
                })
        
            });
        }
    });
   
  }

};
