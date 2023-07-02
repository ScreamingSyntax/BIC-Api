const {pool} = require('../../config/database')
module.exports={
    viewAvailability: (data,callBack)=>{
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
    viewContact:callBack=>{
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
    postContact:(data,callBack)=>{
        pool.query("INSERT INTO contact(name,email,message) values (?,?,?)",
        [data.name,data.email,data.message],
        (err,result)=>{
            if(err){
                return callBack(err,result);
            }
            return callBack(null,result);
        }
        )
    },
    deleteContact:(data,callBack)=>{
        pool.query("DELETE FROM contact where contact_id=?",
        [data.contact_id],
        (err,result)=>{
            if(err){
                return callBack(err,result);
            }
            return callBack(null,result);
        }
        )
    }
}