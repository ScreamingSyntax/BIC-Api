const {viewPost:viewPostService, postBlog:postBlogService,viewAvailability:viewAvailabilityService,deleteBlog:deleteBlogService} = require("./post.service");
const{ fs } = require("node:fs");
const { unlink } = require('node:fs');

const deleteImage = (imagePath,imageName) => {
    unlink(imagePath+imageName, (err) => {
        if (err) throw err;
        console.log('successfully deleted /tmp/hello');
      });
}

module.exports = {
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
    postBlogController:(req,res)=>{
        const blog_image_name = req.files['blog_image'][0].filename;
        const writer_image_name = req.files['writer_image'][0].filename;
        const data = req.body;
        console.log(data)
        postBlogService(data,blog_image_name,writer_image_name,(err,result)=>
        {
            if(err){
                return res.json({
                    success:0,
                    message:"Error Adding Items"
                });
            }
            return res.json({
                success:1,
                data:result
            })
        }
        );
    },
    deleteBlogController:(req,res)=>{
        const data = req.body;
        const imagePath = 'images/blog/';
        viewAvailabilityService(data,(err,result)=>{
            if(result[0]===undefined){
                res.json({
                    success:0,
                    message:"The post you want to delete doesn't exist"
                })
            }
            else{
                deleteImage(imagePath,result[0].blog_image);
                deleteImage(imagePath,result[0].writer_image);
                deleteBlogService(data,result[0].blog_image,result[0].writer_image,(err,result)=>{
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