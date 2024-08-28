
const mysql= require('mysql2');
require('dotenv').config()


const connection = mysql.createConnection(process.env.DATABASE_URL);


connection.connect((err)=>{
  if(err){
  console.error("error while connecting to db",err.stack);
  }else{
    console.log("succesfully connected to db");
  }
})

module.exports = connection;