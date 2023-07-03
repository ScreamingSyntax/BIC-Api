const {pool}= require("../../config/database")


module.exports = {
    viewAvailability: (data,callBack)=>{
        pool.query("Select * from post where post_id=?",
        [data.post_id],
        ((err,result)=>{
            if(err){
                return callBack(err,null);
            }
            return callBack(null,result);
        })  
        );
    },
    viewPost:callBack=>{
        pool.query("Select * from post order by post_id DESC",[],
        ((err,result)=>{
            console.log(err)
            if(err){
                return callBack(err,null);
            }
            return callBack(null,result);
        })
        )
    },
    postBlog:(data,blog_image_path,writer_image_name,date,time,callBack)=>{
        pool.query("INSERT INTO post(title,description,blog_image,writer_image,writer_name,date,time) VALUES (?,?,?,?,?,?,?) ",
        [data.title,data.description,blog_image_path,writer_image_name,data.writer_name,date,time],
        ((err,result)=>{
            if(err){
                return callBack(err,null);
            }
            return callBack(null,result);
        })
        )
    },
    deleteBlog:(data,blog_image_path, writer_image_path,callBack)=>{
        console.log(blog_image_path);
        console.log(writer_image_path);
        pool.query("DELETE FROM post where post_id=?",
        [data.post_id],
        ((err,result)=>{
            // console.log(er);
            if(err){
                return callBack(err,null);
            }
            return callBack(null,result);
        })
        )
    }
}