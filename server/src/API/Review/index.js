import express, { json } from "express";
import { ReviewModel } from "../../Database/Review";
import passport from "passport";

const Router = express.Router();

//get all review
Router.get("/:resId",async(req,res)=>{
    try{
        const {resId} = req.params;
        const reviews = await ReviewModel.find({restaurant: resId}).sort({
            createdAt: -1
        })
        return res.json({reviews});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

//add new food/restaurant review
Router.post("/new",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    try{
        const {_id} = req.user;
        await validateId(req.user);
        const {reviewData} = req.body;
        const newreview = await ReviewModel.create({...reviewData,user: _id});
        return res.json({newreview});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

//Delete Review
Router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    try{
        const {user}=req;
        const {id} = req.params;
        await validateId(req.params);
        const data = await ReviewModel.findOneAndDelete({
            _id: id,
            user: user._id
        });
        if(!data) return res.json({message:"Your review is not delete"});
        return res,json({message: "succesfuly delete your review.",data});
    }
    catch(error){
        return res.status(500).json({error: error.massege});
    }
});

export default Router;