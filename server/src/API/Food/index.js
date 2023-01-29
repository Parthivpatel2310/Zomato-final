import express from "express";
import {FoodModel} from "../../Database/allmodels";
import { validatecategory, validateId } from "../../validation/common";

const Router = express.Router();

Router.get("/:id",async(req,res)=>{
    try{
       const {_id} = req.params;
       await validateId(req.params);
       const foods =FoodModel.findById(_id);
       return res.json({foods});
    }
    catch(error){
        return res.status(500).json({error: error.message})
    }
});

/**
 * Route     /r/:_id
 * Des       Get all food based on particular restaurant
 * Params    _id
 * Access    Public
 * Method    GET
 */

Router.get("/c/category",async(req,res)=>{
    try{
        const {category} =req.params;
        await validatecategory(req.params);
        const foods = await FoodModel.fin({
            category: {$regex: category, $options:"i"},
        });
        if(!foods){
            return res.status(401).json({error: `No matched with ${category}`});
        }
        return res.json({foods})
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

/**
 * Route     /:_id
 * Des       Create New Food Item
 * Params    none
 * Access    Public
 * Method    POST
 */
// Homework

export default Router;