import express from "express";
import dotenv from "dotenv"; 
import  Connection  from "./Database/connection";
import Auth from "./API/auth";
import passport from "passport";
import PrivateRouteConfigfile from "./config/config";
import googleOAuthConfig  from "./config/google"
import Food from "./API/Food";
import Restaurant from "./API/Restaurant";
import User from "./API/User";
import Menu from "./API/Menu";
import Order from "./API/Order";
import Review from "./API/Review";
import Image from "./API/Image";
import  session  from "express-session";

dotenv.config();
const zomato = express();
zomato.use(session({secret:'23102003'}));
const PORT=1112;
PrivateRouteConfigfile(passport);
googleOAuthConfig(passport);

zomato.use(express.json());
zomato.use(passport.initialize());
zomato.use(session({secret: process.env.JWTSECRET}));
zomato.use(passport.session());

zomato.get("/",(req,res)=>{
    res.json({
        massage:"server is running...",
    });
});

zomato.use("/auth",Auth);
zomato.use("/food",Food);
zomato.use("/restaurant",Restaurant);
zomato.use("/user",User);
zomato.use("/menu",Menu);
zomato.use("/order",Order);
zomato.use("/review",Review);
zomato.use("/image",Image);

zomato.listen(PORT,()=>{
    Connection()
    .then(()=>{
        console.log("server is running....");
    })
    .catch((error)=>{
        console.log("database connetion failed");
        console.log(error);
    });
    //console.log("server is running");
});

