import express from "express";
import { UserModel } from "../../Database/allmodels";
import passport from "passport";

const Router = express.Router();
//private
Router.get("/",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    try{
        const {email,fullName,phoneNumber,address}= req.user;
        return res.json({user: {email,fullName,phoneNumber,address}});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

//public
Router.get("/:_id",async(req,res)=>{
    try{
        const {_id} = req.params;
        await validateId(req.params);
        const getUser = await UserModel.findById(_id);
        const {fullName} = getUser;
        if(!getUser){
            return res.status(401).json({error:"user not find by id"})
        }
        return res.json({user:{fullName}})
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

//update user
Router.put("/update/:_id",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    try{
        const {_id} = req.params;
        await validateId(req.params);
        const {userData} = req.body;
        userData.password = undefined;
        const {updateUserData} = await UserModel.findById(_id,{$set: userData},{
         new: true,
        });
        return res.json({user:updateUserData});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

export default Router;