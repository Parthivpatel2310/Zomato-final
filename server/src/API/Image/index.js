import express from "express";
import aws from "aws-sdk";
import multer from "multer";
import { ImageModel } from "../../Database/allmodels";
import  {s3upload} from "../../utils/s3";

const Router = express.Router();

//configuer multer
const storage = multer.memoryStorage();
const upload = multer({storage});

Router.get("/:_id",async(req,res)=>{
    try{
        const image = await ImageModel.findById(req.params._id);
        return res.json({image});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

//upload image at aws
Router.post("/",upload.single('file'),async(req,res)=>{
    try{
        const file = req.file;
        const bucketoption = {
            Bucket: "zomato-clone",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"
        };
        const uploadImage = await s3upload(bucketoption);
        const dbUpload = await ImageModel.create({
            images: [
               { location: uploadImage.location,},
            ],
        });
        return res.status(200).json({dbUpload});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

export default Router;
