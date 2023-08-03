// const MovieModel = require("./database/movies");
// const UserModel = require("./database/users");
require('dotenv').config()
const express = require("express");
var cors = require('cors')
const helmet = require("helmet");
var mongoose = require("mongoose");
require("@babel/core").transform("code", {
    presets: ["@babel/preset-env"],
});
const app = express();
app.use(cors())
app.use(express.json());
app.use(helmet());



const mongoDB = process.env.mongoDB_URI;
mongoose.connect(mongoDB, {useNewUrlParser:true, useUnifiedTopology:true}).then(()=>console.log("CONNECTION ESTABLISHED"));


//http://localhost:3000/
app.get("/",(req,res)=>{
    return res.json({"WELCOME": 'to my backend for the ZOMATO-MASTER'});
});

/*
route      -------/movies
description ------get all movies
access  ----------public
parameter---------none
methods-----------GET
*/

//http://localhost:5000/movies
app.get("/movies",async(req, res) => {//set request and response and set url
    const getAllMovies= await MovieModel.find();
    return res.json(getAllMovies);
});




/*
route      -------/movies/:id
description ------get a one  movie
access  ----------public
parameter---------none
methods-----------GET
*/

//http://localhost:3000/movie/:id
app.get("/movie/:id",async(req, res) => {
    const {id} = req.params;
    const getMovie= await MovieModel.findOne({_id: id});
    return res.json(getMovie);
});




/*
route      -------/user-register
description ------post single user details in user collection
access  ----------public
parameter---------none
methods-----------POST
*/

//http://localhost:3000/user-register
app.post("/user-register",async(req, res) => {//set request and response and set url
    const addNewUser = await UserModel.create(req.body);
    return res.json({userAdded: addNewUser, message:"User was added!!!"});
   
});








app.listen(5000,()=>{
    console.log("MY EXPRESS APP IS RUNNING.....");
});