const {pool} = require("../../config/database")

module.exports = {
    submitEnquiry:(data,date,time,callBack)=>{
        pool.query("INSERT INTO enquire(name,phone,email,sector,referral,date,time) values (?,?,?,?,?,?,?)",
        [data.name,data.phone,data.email,data.sector,data.referral,date,time],
        ((err,result,field)=>{
            console.log(result)
            if(err){
                return callBack(err,null);
            }
            return callBack(null,result);
        }
        ))
    },
}