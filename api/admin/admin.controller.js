const {
adminLoginService,
viewEnquireService,
viewEnquireAvailabilityService,
deleteEnquireService,
viewContactService,
viewContactAvailabilityService,
deleteContactService,
viewPostAvailabilityService,
viewPostService,
deleteBlog
} = require('./admin.service');
const { unlink } = require('node:fs');
const { sign } = require("jsonwebtoken");
const { json } = require('express');
require('dotenv').config()

const deleteImage = (imagePath,imageName) => {
    unlink(imagePath+imageName, (err) => {
        if (err) throw err;
        console.log('successfully deleted /tmp/hello');
      });
}


module.exports={
  
   adminLoginController:(req,res)=>{
    data = req.body;
    console.log(data)
    adminLoginService(data,(err,results)=>{
    console.log(results[0])
      if(err){
        return res.json({
          success:0,
          message:"Error Logging In"
        })
      }
      if (results[0].name === data.name && results[0].password === data.password) {
        const jsontoken = sign({result:results} ,process.env.KEY,{
          expiresIn: "1h"
        });
        // console.log(`aaa ${jsontoken}`)
        return res.json({
          success:1,
          message:"Successfully Logged In",
          token:jsontoken
        })
      }

      else{

        return res.json({
          success:0,
          message:"The credentials donot match",
        })
      }
    })
   },

    viewEnquiry: (req, res) => {
        viewEnquireService((err, results) => {
          if (err) {
            return res.json({
              success: 0,
              message: "Error Fetching Enquiries",
            });
          } else if (results[0] === undefined) {
            return res.json({
              success: 0,
              message: "No Enquires to View",
            });
          }
            return res.json({
              success: 1,
              data: results,
            });
          });
      },
      deleteEnquire: (req, res) =>
      {
        const data = req.body;
        console.log(data)
        viewEnquireAvailabilityService(data, (err, results) => {
        // console.log(results[0])
          if (results[0] === undefined) {
            return res.json({
              success: 0,
              message: "The enquiry that you are trying to delete doesn't exist",
            });
          } else {
            deleteEnquireService(data, (err, results) => {
              if (err) {
                return res.json({
                  success: 0,
                  message: "Error Deleting Enquiry",
                });
              }
              return res.json({
                success: 1,
                data: "Successfully Deleted",
              });
            });
          }
        });
      },
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
          return res.json({
            success: 1,
            data: result,
          });
        });
      },
      deleteContact:(req,res)=>{
        const data = req.body;
        viewContactAvailabilityService(data,(err,result)=>{
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
       
      },
    viewPostController:(req,res)=>{
        viewPostService((err,result)=>{
            if(err){
                return res.json({
                    success:0,
                    message:"Error Fetching Posts"
                })
            }
            else if(result[0]===undefined){
                return res.json({
                    success:0,
                    message:"No Posts to View"
                })
            }
            return res.json({
                success:1,
                data:result
            })
        })
    },
    deleteBlogController:(req,res)=>{
        const data = req.body;
        const imagePath = 'images/blog/';
        viewPostAvailabilityService(data,(err,result)=>{
            if(result[0]===undefined){
                res.json({
                    success:0,
                    message:"The post you want to delete doesn't exist"
                })
            }
            else{
                deleteImage(imagePath,result[0].blog_image);
                deleteImage(imagePath,result[0].writer_image);
                deleteBlog(data,result[0].blog_image,result[0].writer_image,(err,result)=>{
                    if(err){
                        return res.json({
                            success:0,
                            message:"Error Deleting Post"
                        })
                    }
                    return res.json({
                        success:1,
                        message:"Successfully deleted post"
                    })
                })
            }
        })

    }

}