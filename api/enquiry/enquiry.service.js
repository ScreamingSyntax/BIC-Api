const {pool} = require("../../config/database")

module.exports = {
    viewAvailability: (data,callBack)=>{
        pool.query("Select * from enquire where enquire_id=?",
        [data.enquire_id],
        (err,result,field)=>{
            if(err){
                return callBack(err,null);
            }
            return callBack(null,result);
        }
        )
    },
    viewEnquiry: callBack=>{
        pool.query("SELECT * FROM enquire",
        (err,result,field)=>{
            console.log(err) 
            if(err){
                return callBack(err,null);
            }
            return callBack(null,result);
        }
        );
    },
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
    deleteEnquire:(data,callBack)=>{
        pool.query("DELETE FROM enquire where enquire_id=?",
        [data.enquire_id],
        (err,result,field)=>{
            if(err){
                return callBack(err,null);
            }
            return callBack(null,result);
        }
        )
    }
}