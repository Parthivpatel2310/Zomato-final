import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
    {
         name: {type:String, required:true},
         descript: {type: String , required: true},
         isVeg: {type: String , required: true},
         //isContainsEgg: {types: String , required: true},
         Category: {type: String , required: true},
         photoes: {
            type: mongoose.Types.ObjectId,
            ref: "images",
         },
         price: {type: Number , default: 100, required: true},
         addons: [
            {
                type: mongoose.Types.ObjectId,
                ref: "foods"
            }
         ],
         restaurant: {
            type: mongoose.Types.ObjectId,
            ref: "restaurant",
            required: true
         }
    },
    {
         timestamps: true
    });

export const FoodModel = mongoose.model("foods",FoodSchema);