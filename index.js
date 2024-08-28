const express = require('express');
const createTable = require('./db/db.js');
const routes=require('./routes/routes.js');
require('dotenv').config();

const app = express();


//call create table
//createTable() 
app.use(express.json());

app.use('/',routes);

/*app.get('/hello',(req,res)=>{
  res.send({message:"hello"});
})
app.post('/addSchool',(req,res)=>{
  console.log("recieved")
  const {name, address, latitude,longitude}=req.body;
  console.log(name,address,latitude,longitude);
  res.send({message:"recieved"});
})*/

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});