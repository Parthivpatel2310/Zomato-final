import express from "express";
import { ImageModel } from "../../Database/allmodels";
import { MenuModel } from "../../Database/allmodels";
import { validateId } from "../../validation/common";

const Router = express.Router();

Router.post("/list/:_id",async(req,res)=>{
    try{
        const {_id} = req.params;
        await validateId(req.params);
        const menus = await MenuModel.findById(_id);
        if(!menus){
            return res.status(401).json({error: "No menu present for this restaurant"});
        }
        return res.json({menus});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

//image in menu
Router.get("/image/:_id",async(req,res)=>{
    try{
        const {_id} = req.params;
        await validateId(req.params);
        const menuImages = await ImageModel.findById(_id);
        if(!menuImages){
            return res.status(401).json({message:"No Menu Images found"});
        }
        return res.json({menuImages});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

export default Router;