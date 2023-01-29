
import JWTPassport from "passport-jwt";
import { UserModel } from "../Database/allmodels";

const JWTStratergy = JWTPassport.Strategy;
const ExtractJWT = JWTPassport.ExtractJwt;
const option={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "23102003",
};

export default (passport)=>{
    passport.use(
        new JWTStratergy(option,async(jwt_payload,done)=>{
            try{
                const doesUserExist=await UserModel.findById(jwt_payload.user);
                if(!doesUserExist) return done(null,false)
                return done(null,doesUserExist);
            }
            catch(error){
                throw new Error(error);
            }
       } )
    );
};