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