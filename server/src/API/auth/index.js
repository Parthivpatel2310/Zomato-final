import express from "express";
import { UserModel } from "../../Database/Users";
import { validateSignin, validateSignup } from "../../validation/auth-validation";
import passport from "passport";

const Router = express.Router();

Router.post("/signup",async(req,res)=>{
    try{
       await validateSignup(req.body.credential);
       await UserModel.findByEmailAndPhone(req.body.credential);
       const newuser = await UserModel.create(req.body.credential);
       const token = newuser.generatejwtToken();
       return res.status(200).json({token,status:"Success"});
    }
    catch(error){
        return res.status(500).json({status:"failed",error: error.message})
    }
});

Router.post("/signin",async(req,res)=>{
    try{
        await validateSignin(req.body.credential);
        const user =  await UserModel.findByEmailAndPassword(req.body.credential)
        const token = user.generatejwtToken();
        return res.status(200).json({token,status:"Success"});
     }
     catch(error){
         return res.status(500).json({status:"failed",error: error.message})
     }
});

//google auth
Router.get("/google",passport.authenticate("google",{
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
       ],
    })
);

Router.get(
    "/google/callback",
    passport.authenticate("google",{failureRedirect:"/"}),
    (req,res)=>{
        return res.status(200).json({token: req.session.passport.user.token});
    }
);

export default Router;