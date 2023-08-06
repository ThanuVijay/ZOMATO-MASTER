// import { UserModel, ImageModel, ReviewModel } from './database/allModels';
require("@babel/core").transform("code", {
    presets: ["@babel/preset-env"],
});
require('dotenv').config()
import express  from "express";
import cors from "cors";
import helmet from "helmet"
// var mongoose = require("mongoose");

//connection
import ConnectDB from "./database/connection";

//API
import Auth from "./API/Auth";

const app = express();
app.use(cors())
app.use(express.json());
app.use(helmet());

//appication routes
app.use("/auth", Auth)

app.listen(4001, ()=>{
    ConnectDB()
    .then(()=>{
        console.log("Zomato Server is Running...!!")
    }).catch((error)=>{
        console.log("Zomato Server is Running.. But DB Connection is Failed....!!!");
        console.log(error);
    })
})
