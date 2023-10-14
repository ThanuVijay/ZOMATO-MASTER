//lib
import express from "express";
import passport from "passport";
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

// Router.post("/signup", async (req, res) => {
//     try {
//         const { email, password, fullName, phoneNumber } = req.body.credentials;
//         const checkUserByEmail = await UserModel.findOne({ email });
//         const checkUserByPhone = await UserModel.findOne({ phoneNumber });

//         if (checkUserByEmail || checkUserByPhone) {
//             return res.json({ user: "User already exists!" });
//         }

//         //hash pw

//         const bcryptSalt = await bcrypt.genSalt(8);
//         const hashedPassword = await bcrypt.hash(password, bcryptSalt);

//         //savedata db
//         await UserModel.create({
//             ...req.body.credentials,
//             password: hashedPassword
//         });

//         //generate JWT auth token 
//         const token = jwt.sign({ user: { fullName, email } }, "ZomatoApp");

//         return res.status(200).json({ token, status: "success" });

//     } catch (error) {
//         return res.status(500).json({ error: error.message })
//     }
// });


/* Router
    des   register new user
    params none
    Accesss Public 
    Method Post
*/
Router.post("/signup", async (req, res) => {
    try {
        await UserModel.findByEmailAndPhone(req.body.credentials);
        const newUser = await UserModel.create(req.body.credentials);
        const token = newUser.generateJwtToken();
        return res.status(200).json({token, status:"success"});

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
});


/* Router
    des   sign in exiting user
    params none
    Accesss Public 
    Method Post
*/
Router.post("/signin", async(req,res)=>{
    try {
       const user = await UserModel.findByEmailAndPassword(req.body.credentials);
       const token = user.generateJwtToken();
       return res.status(200).json({token, status:"success"});

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


/* Router
    des   google signup
    params none
    Accesss Public 
    Method Post
*/

Router.get("/google", passport.authenticate("google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
    ],
}))


/* Router
    des   google callback
    params none
    Accesss Public 
    Method Post
*/

Router.get("/google/callback", passport.authenticate("google",{failurRedirect:"/"}),
    (req,res)=>{
        return res
        .status(200)
        .json({token: req.session.passport.user.token, status:"success"});
    }
)

export default Router;