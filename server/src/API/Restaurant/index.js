import express from "express";
import {RestaurantModel} from "../../Database/allmodels";
import { validateCity, validateId, validateSearchString } from "../../validation/common";

const Router = express.Router();

Router.get("/",async(req,res)=>{
    try{
        const {city} = req.query;
        await validateCity(req.query);
        const restaurants = await RestaurantModel.find({city});
        if(restaurants.length ===0){
            return res.json({error: "No restaurant found in city"})
        }
        return res.json({restaurants})
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

//For single restaurant
Router.get("/:_id",async(req,res)=>{
    try{
       const {_id} = req.params;
       await validateId(req.params);
       const restaurant = await RestaurantModel.findById(_id);
       if(!restaurant){
        return res.status(400).json({error: "restaurant not found"});
       }
       return res.json({restaurant});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});
//Search
Router.get("/search/:searchString",async(req,res)=>{
    try{
       const {searchString} = req.params;
       await validateSearchString(req.params);
       const restaurants = await RestaurantModel.find({
        name: {$regex: searchString, $options: "i"}
       })
       if(!restaurants.length === 0){
          return res.status(401).json({error: `No restaurant is found`});
       }
       return res.json({restaurants});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

export default Router;