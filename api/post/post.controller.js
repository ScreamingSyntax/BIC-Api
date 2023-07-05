const { postBlog:postBlogService,viewPostService} = require("./post.service");
const{ fs } = require("node:fs");
const { unlink } = require('node:fs');
const { fetchDateTime } = require("../../tools/date/date.time");
const moment = require("moment-timezone");
const { error } = require("node:console");
moment.tz.setDefault("Asia/Kathmandu");


const deleteImage = (imagePath,imageName) => {
    unlink(imagePath+imageName, (err) => {
        if (err) throw err;
        console.log(`successfully deleted ${imagePath}/${imageName} `);
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
        const data = req.body;
        const blog_image_name = req.files['blog_image'][0].filename;
        const writer_image_name = req.files['writer_image'][0].filename;
        fetchDateTime().then((value) =>
        {
            if(value === false){
                return res.json({
                    success:0,
                    message:"Error fetching date and time"
                })
            }
        current_date = moment(value).format("YYYY-MM-DD");
        current_time = moment(value).format("HH:mm");
        postBlogService
        (data,blog_image_name,writer_image_name,current_date ,current_time,(err,result)=>
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
        });});
    },
}