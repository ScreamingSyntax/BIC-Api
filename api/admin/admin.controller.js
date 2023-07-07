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
  deleteBlog,
  deleteAllContactService,
  deleteAllEnquireService,
  viewPostByID,
  updateBlogContentService,
  viewRecentBlogService,
  deleteAllPostService
} = require("./admin.service");
const { unlink } = require("node:fs");
const { sign } = require("jsonwebtoken");
const { json } = require("express");
require("dotenv").config();
const fs = require('fs-extra');
const deleteImage = (imagePath, imageName) => {
  unlink(imagePath + imageName, (err) => {
    if (err) throw err;
    console.log(`successfully deleted ${imagePath}/${imageName}`);
  });
};

module.exports = {
  adminLoginController: (req, res) => {
    data = req.body;
    console.log(data);
    adminLoginService(data, (err, results) => {
      console.log(results);
      if (err) {
        return res.json({
          success: 0,
          message: "Error Logging In",
        });
      }
      if (results === undefined || results[0] === undefined) {
        return res.json({
          success: 0,
          message: "Invalid Credentials",
        });
      }
      if (
        results[0].name === data.name &&
        results[0].password === data.password
      ) {
        const jsontoken = sign({ result: results }, process.env.KEY, {
          expiresIn: "1h",
        });
        // console.log(`aaa ${jsontoken}`)
        return res.json({
          success: 1,
          message: "Successfully Logged In",
          token: jsontoken,
        });
      }
    });
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
  deleteEnquire: (req, res) => {
    const data = req.body;
    console.log(data);
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
            message: "Successfully Deleted",
          });
        });
      }
    });
  },
  deleteAllEnquiry: (req, res) => {
    deleteAllEnquireService((err, result) => {
      if (err) {
        return res.json({
          success: 0,
          message: "Error Deleting Enquiries",
        });
      } else if (result[0] == undefined) {
        return res.json({
          success: 0,
          message: "Not Enquiries to Delete",
        });
      }
      return res.json({
        success: 1,
        message: "Successfully Deleted All Enquiries",
      });
    });
  },
  viewContact: (req, res) => {
    viewContactService((err, result) => {
      if (err) {
        return res.json({
          success: 0,
          message: "Error fetching contact-list",
        });
      } else if (result[0] == undefined) {
        return res.json({
          success: 0,
          message: "No Contacts to View",
        });
      }
      return res.json({
        success: 1,
        data: result,
      });
    });
  },
  deleteContact: (req, res) => {
    const data = req.body;
    viewContactAvailabilityService(data, (err, result) => {
      console.log(result);
      if (result[0] === undefined) {
        return res.json({
          success: 0,
          message: "The contact you are trying to delete doesn't exist",
        });
      } else {
        deleteContactService(data, (err, result) => {
          if (err) {
            return res.json({
              success: 0,
              message: "Error Deleting Contact Details",
            });
          }
          return res.json({
            success: 1,
            message: "Successfully Delted Contact Details",
          });
        });
      }
    });
  },
  deleteAllContactService: (req, res) => {
    deleteAllContactService((err, results) => {
      if (err) {
        return res.json({
          success: 0,
          message: "Error Clearing All Contact",
        });
      } else if (results[0] === undefined) {
        return res.json({
          success: 0,
          message: "No Contact to Delete",
        });
      }
      return res.json({
        success: 1,
        data: "Successfully Deleted",
      });
    });
  },
  viewPostController: (req, res) => {
    viewPostService((err, result) => {
      if (err) {
        return res.json({
          success: 0,
          message: "Error Fetching Posts",
        });
      } else if (result[0] === undefined) {
        return res.json({
          success: 0,
          message: "No Posts to View Sir",
        });
      }
      return res.json({
        success: 1,
        data: result,
      });
    });
  },
  viewPostByIDController: (req, res) => {
    const data = req.body;
    viewPostByID(data, (err, result) => {
      console.log(result[0]);
      if (err) {
        return res.json({
          success: 0,
          message: "Error Viewing the post",
        });
      } else if (result[0] === undefined) {
        return res.json({
          success: 0,
          message: "The Post doesn't exist",
        });
      }
      return res.json({
        success: 0,
        data: result,
      });
    });
  },
  updateBlogController: (req, res) => {
    const data = req.body;
    const imagePath = "images/blog/";
    const blog_image_name = req.files["blog_image"][0].filename;
    const writer_image_name = req.files["writer_image"][0].filename;
    console.log(data);
    if (data.post_id === undefined) {
      return res.json({
        success: 0,
        message: "You need to specify post_id to update",
      });
    }

    viewPostByID(data, (err, result) => {
      if (err) {
        return res.json({
          success: 0,
          message: "Error Viewing the Post",
        });
      } else if (result[0] == undefined) {
        return res.json({
          success: 0,
          message: "The Post doesn't exist",
        });
      }
      console.log(result[0].blog_image);
      console.log(result[0].writer_image);
      deleteImage(imagePath, result[0].blog_image);
      deleteImage(imagePath, result[0].writer_image);
      updateBlogContentService(
        data,
        blog_image_name,
        writer_image_name,
        (err, result) => {
          if (err) {
            return res.json({
              success: 0,
              message: "Error Updating Photos",
            });
          }
          return res.json({
            success: 1,
            message: "Successfully Updated Values",
          });
        }
      );
    });
  },
  viewRecentBlogsController:(req,res)=>{
    const data = req.query;
    // console.log(data)
    // console.log(req.query)
    // console.log(data.post_id);
    if(data.post_id === undefined){
      return res.json({
        success:0,
        message:"Send post_id to view :<>"
      })
      }
    viewPostByID(data,(err,result1)=>{
      // console.log(result1)
      if(err)
      {
        return res.json({
          success:0,
          message:"Error fetching data from post_id"
        })
      }
      if(result1.length !=1){
        return res.json({
          success:0,
          message:"The post doesn't exist"
        })
      }
      else{
        viewRecentBlogService(result1[0],(err,result2)=>{
          if(err){
            return res.json({
              success:0,
              message:"The post doesn't exits"
            })
          }
          return res.json({
            success:1,
            mainData: result1,
            recentData:result2
          })
        });
      }
    })
  },
  // viewThreeBlogController:(req,res)=>{
  //   const data = req.query;
  //   // console.log(req.query)
  //   console.log(data.post_id);
  //   if(data.post_id === undefined){
  //     return res.json({
  //       success:0,
  //       message:"Send post_id to view :<>"
  //     })
  //   }
  //   viewThreeAcendingBlogService(data,(err,result)=>{
  //     // console.log(result.length)
  //     console.log(result)
  //     if(err){
  //       return res.json({
  //         success:0,
  //         message:"Error Viewing Blogs"
  //       })
  //     }
  //     if(result.length==0){
  //       return res.json({
  //         success:0,
  //         message:"The post you are trying to view doesn't exist"
  //       })
  //     }
  //     if(result.length==3){
  //       return res.json({
  //         success:1,
  //         data:result
  //       })
  //     }
  //     if(result.length<3){
  //       viewThreeDescenginBlogService(data,(err,result)=>{
  //         console.log(result)
  //         if(err){
  //           return res.json({
  //             success:0,
  //             message:"Error Viewing Blogs"
  //           })
  //         }
  //         return res.json({
  //           success:1,
  //           data:result
  //         })
  //       })
  //     }

  //   })
  // },
  deleteBlogController: (req, res) => {
    const data = req.body;
    const imagePath = "images/blog/";
    console.log(data);
    console.log(`this is data ${data}`)
    viewPostAvailabilityService(data, (err, result) => {
      // result
      if (result[0] === undefined) {
     return  res.json({
          success: 0,
          message: "The post you want to delete doesn't exist",
        });
      } else {
        deleteImage(imagePath, result[0].blog_image);
        deleteImage(imagePath, result[0].writer_image);
        deleteBlog(
          data,
          result[0].blog_image,
          result[0].writer_image,
          (err, result) => {
            if (err) {
              return res.json({
                success: 0,
                message: "Error Deleting Post",
              });
            }
            return res.json({
              success: 1,
              message: "Successfully deleted post",
            });
          }
        );
      }
    });
  },
  deleteAllPostController:(req,res)=>{
    fs.emptyDir('images/blog/')
    .then(() => {
      console.log('All post images deleted successfully.');
    })
    .catch((err) => {
      console.error('Error deleting files:', err);
    });
    viewPostService((err,result)=>{
      if(result.length===0){
        return res.json({
          success:0,
          message:"No Posts To Delete"
        })
      }
      else{
        deleteAllPostService((err,result)=>{
          if(err){
           return  res.json({
           success:0,
              message:"Error Deleting Post"
            })
          }
          console.log(result)
          if(result.length===0){
           return res.json({
              success:0,
              message:"Not Posts to Delete"
            })
          }
          return res.json({
            success:0,
            message:"Deleted All Posts"
          })
        });
      }
    })
 
  }
};
