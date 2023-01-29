
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
    {
      fullName: {type: String , required: true},
      email: {type: String , required: true},
      password:  String,
      address: [
        {
            detail: String,
            for: String,
        }
      ],
      phoneNumber: [Number],
    },  
    {
         timestamps: true
    }
);

UserSchema.method.generateJwtToken = function (){                                        //Attechment
    return jwt.sign(
        {user: this._id.toString()},"23102003"
        );
};

UserSchema.statics.findByEmailAndPhone = async (email,phoneNumber) => {
  const checkUserByEmail = await UserModel.findOne({email});
  const checkUserByPhone = await UserModel.findOne({phoneNumber});

  if(checkUserByEmail || checkUserByPhone){
    throw new Error("User Already exist")
  }
  return false
};                                                                                       //helper Function
UserSchema.statics.findByEmailAndPassword = async (email,password) => {
  const user = await UserModel.findOne({email});
  if(!user) throw new Error("User doesn't exist");

  const doesPasswordmatch = await bcrypt.compare(password,user.password)
  if(!password) throw new Error("Invalid password or username");

  return user;
};

UserSchema.pre("save",function(next){
  const user = this;
  if(!user.isModified("password"))
  return next();
  bcrypt.genSalt(5,(error,salt)=>{
    if(error) return next(error);
  bcrypt.hash(user.password,salt,(error,hash)=>{
    if(error) return next(error);
  user.password = hash;
  return next();
  });
  });
});

export const UserModel = mongoose.model("users",UserSchema);