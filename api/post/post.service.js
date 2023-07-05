const {pool}= require("../../config/database")


module.exports = {
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
    viewPostService:callBack=>{
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
}