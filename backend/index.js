const express = require('express');
const cors=require("cors");
const mongoose = require('mongoose');

const bodyparser = require('body-parser');

const dotenv = require('dotenv');
const connectDB = require('./database/connection');
const Student=require("./model/student");

const Faculty=require("./model/faculties");

const ef=require("express-fileupload")
const app = express();
app.use(ef());
const port = 5000
app.use(cors());
dotenv.config({path:'config.env'});

//mongodb connection

connectDB();

app.use(bodyparser.urlencoded({extended:true}))


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post("/std-reg",async (req,res)=>{

  var obj={
    name:req.body.name,
    fname:req.body.fname,
    email:req.body.email,
    contact:req.body.contact,
    dob:req.body.dob,
    gender:req.body.gender,
    department:req.body.department,
    address:req.body.address,
    e_qualification:req.body.e_qualification,
    job:req.body.job,
    freshers:req.body.freshers,
    experience:req.body.experience


  };

  Student.create(obj);
  

  res.json({msg:"Student-submited"});

});

app.post("/fact-reg",async (req,res)=>{

  var obj={
    name:req.body.name,
    email:req.body.email,
    contact:req.body.contact,
    gender:req.body.gender,
    department:req.body.department

  };

  Faculty.create(obj);
  

  res.json({msg:"faculties-submited"});

});

app.get("/liststd",async (req,res)=>{

  var st=await Student.find();
  

  res.json(st);

});
app.get("/listfac",async (req,res)=>{

  var st=await Faculty.find();
  

  res.json(st);

});

app.listen(port, () => {
  console.log(`Successfully! listening on port ${port}`)
})