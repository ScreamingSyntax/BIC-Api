const {createPool} = require('mysql2');
require('dotenv').config()

const pool = createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});


pool.getConnection((err,connection)=>{
    if(err){
        console.log("Database connection failed");
        return;
    }
    console.log("Database connected successfully");   
    connection.release();
})

module.exports = {pool};