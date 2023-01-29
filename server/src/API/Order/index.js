import  express  from "express";
import passport from "passport";
import { OrderModel } from "../../Database/Order";

const Router = express.Router();

//get all order(private)
Router.get("/",passport.authenticate("jwt",{session: false}),async(req,res)=>{
    try{
        const {user} = req;
        const getOrders = await OrderModel.findOne({user: user._id});
        if(!getOrders)
            return res.status(401).json({error: "No order for this user"});
            return res.status(200).json({orders: getOrders});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

//add order(private)
Router.put("/new",passport.authenticate("jwt",{session: false}),async(req,res)=>{
    try{
        const {user} = req;
        const {orderdetails} = req.body;
        const addNewOrder = await OrderModel.findByOneAndUpdate({
            user: user._id
        },
        {
            $push:{
                orderdetails: orderdetails,
            },
        },
        {
            new: true,
        });
        return res.json({order: addNewOrder});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

export default Router;