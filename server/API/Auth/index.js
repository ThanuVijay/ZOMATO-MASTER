//lib
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//modls
import { UserModel } from "../../database/allModels";


//create router

const Router = express.Router();

/* Router
    des   register new user
    params none
    Accesss Public 
    Method Post
*/

Router.post("/signup", async (req, res) => {
    try {
        const { email, password, fullName, phoneNumber } = req.body.credentials;
        const checkUserByEmail = await UserModel.findOne({ email });
        const checkUserByPhone = await UserModel.findOne({ phoneNumber });

        if (checkUserByEmail || checkUserByPhone) {
            return res.json({ user: "User already exists!" });
        }

        //hash pw

        const bcryptSalt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, bcryptSalt);

        //savedata db
        await UserModel.create({
            ...req.body.credentials,
            password: hashedPassword
        });

        //generate JWT auth token 
        const token = jwt.sign({user: {fullName, email}},"zomatoo");

        return res.status(200).json({token, status:"success"});

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
});


export default Router;