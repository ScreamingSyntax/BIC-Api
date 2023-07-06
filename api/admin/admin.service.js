const {pool} = require('../../config/database')

module.exports = {
    adminLoginService:(data,callBack)=>{
        pool.query('SELECT name,password FROM admin where name=?',
        [data.name],
        (err,result)=>{
            if(err){
                return callBack(err,null);
            }
            return callBack(null,result)
        }
        )
    },
    viewEnquireAvailabilityService:(data,callBack)=>{
        pool.query("Select * from enquire where enquire_id = ?",
        [data.enquire_id],
        (err,result)=>{
            if(err){
                return callBack(err,null)
            }
            return callBack(null,result);
        }
        )
    },
    viewEnquireService:callBack=>{
        pool.query("Select * from enquire",[],
        (err,result)=>{
            if(err){
                return callBack(err,result);
            }
            return callBack(null,result);
        }
        )
    },
    deleteEnquireService:(data,callBack)=>{
        console.log(data)
        pool.query("DELETE FROM enquire where enquire_id=?",
        [data.enquire_id],
        (err,result)=>{
            if(err){
                return callBack(err,null);
            }
            return callBack(null,result);
        }
        );
    },
    deleteAllEnquireService:(callBack)=>{
        pool.query("DELETE from enquire",
        [],
        (err,result)=>{
            if(err){
                return callBack(err,result);
            }
            return callBack(null,result);
        }
        )
    },
    viewContactAvailabilityService: (data,callBack)=>{
        pool.query("SELECT * FROM contact where contact_id=?",
        [data.contact_id],
        (err,result)=>{
            console.log(result)
            if(err){
                return callBack(err,null);
            }
            return callBack(null,result);
        }
        );
    },
    viewContactService:callBack=>{
        pool.query("SELECT * FROM contact",
        [],
        (err,result)=>
        {
            if(err){
                return callBack(err,null);
            }
            return callBack(null,result);
        }
        )
    },
    deleteContactService:(data,callBack)=>{
        pool.query("DELETE FROM contact where contact_id=?",
        [data.contact_id],
        (err,result)=>{
            if(err){
                return callBack(err,result);
            }
            return callBack(null,result);
        }
        )
    },
    deleteAllContactService:(callBack)=>{
        pool.query("DELETE from contact",
        [],
        (err,result)=>{
            if(err){
                return callBack(err,result);
            }
            return callBack(null,result);
        }
        )
    },

    viewPostAvailabilityService: (data,callBack)=>{
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
    viewPostByID: (data, callBack) => {
        pool.query(
            "SELECT * FROM post WHERE post_id = ?",
            [data.post_id],
           ((err, result) => {
                if (err) {
                    return callBack(err, null);
                }
                // console.log(result);
                return callBack(null, result);
            }
        ));
    },    
    updateBlogContentService:(data,blog_image_name,writer_image_name,callBack)=>{
        pool.query("update post set title=?,description=?,blog_image=?,writer_image=?,writer_name=? where post_id=?",
        [data.title,data.description,blog_image_name,writer_image_name,data.writer_name,data.post_id],
        ((err,result)=>{
            if (err) {
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
    },
    // viewThreeAcendingBlogService:(data,callBack)=>{
    //     console.log("This is data ",data)
    //     pool.query("SELECT * FROM post where post_id>=? limit 3",
    //     [data.post_id],
    //     ((err,result)=>{
    //         if(err){
    //             return callBack(err,null);
    //         }
    //         return callBack(null,result)
    //     })
    //     )
    // },
    // viewThreeDescenginBlogService:(data,callBack)=>{
    //     pool.query(" SELECT * FROM post where post_id<=? order by post_id desc LIMIT 3",
    //     [data.post_id],
    //     ((err,result)=>{
    //         if(err){
    //             return callBack(err,null);
    //         }
    //         return callBack(null,result)
    //     })
    //     )
    // },
    viewRecentBlogService:(data,callBack)=>{
        // console.log(data.post_id)
        pool.query("select * from post where post_Id != ? order by post_id desc limit 2",
        [data.post_id],
        ((err,result)=>{
            if(err){
                return callBack(err,null);
            }
            return callBack(null,result);
        })
        )
    },
    deleteAllPostService:callBack=>{
        pool.query("DELETE FROM post",
        [],
        ((err,result)=>{
            if(err){
                return callBack(err,null);
            }
            return callBack(null,result)
        })
        )
    }
}