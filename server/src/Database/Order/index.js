import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
       user:{
        type: mongoose.Types.ObjectId,
        Ref : "users"
       },
       orderdetails: [
        {
            food: [
                { 
                    details: {type: mongoose.Types.ObjectId , ref: "foods"},
                    quantity: {type: Number , required: true},
                },
            ],
            paymode: {type: String , required:true},
            status: {type: String , default: "placed"},
            paymentdetails: {
                itemtotal: {type: Number , required: true},
                promo: {type: Number , required: true},
                tax: {type: Number , required: true},
                razopay_payment_id: {type: String , required: true},
            },
        },
       ] ,
     },
    
    {
         timestamps: true
    });

export const OrderModel = mongoose.model("orders",OrderSchema);