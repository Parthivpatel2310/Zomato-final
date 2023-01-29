import passport from "passport";
import googleOAuth from "passport-google-oauth2";
import { UserModel } from "../Database/allmodels";

const GoogleStrategy = googleOAuth.Strategy;

export default (passport) => {
     passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:1112/auth/google/callback"
        },
        async(accessToken,referenceToken,profile,done)=>{
            const newuser = {
                fullName: profile.displayName,
                email: profile.email[0].value,
                profilepic: profile.photo[0].value,
            };
        try{
            const user = await UserModel.findOne({email: newuser.email });
            if(user){
            const token = user.generateJwtToken();
            done(null,{user,token})
            }else{
                const user = await UserModel.create(newuser);
                const token = user.generateJwtToken();
                done(null,{user,token})
            }
        }
        catch(error){
            done(error,null)
        }
       } 
      )
    );
    passport.serializeUser((userData,done)=>done(null,{...userData}));
    passport.deserializeUser((id,done)=>done(null,id));
} ;