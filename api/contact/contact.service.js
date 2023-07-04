const {pool} = require('../../config/database')
module.exports={
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
}